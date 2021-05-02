import { IChoice, IGameData, ILevel } from './models';
import SessionStorageManager from './SessionStorageManager';
import { GameStatus, ILevelValue } from './types';
import axios from 'axios';
import { toast } from 'react-toastify';

export default class GameManager {
  private static readonly LEVEL_KEY = 'currentLevel';
  private static readonly GAME_DATA_KEY = 'gameData';
  private static readonly GAME_STATUS_KEY = 'gameStatus';
  private static levels: Map<string, ILevel> = new Map();

  static get currentLevelId(): string {
    return SessionStorageManager.get(GameManager.LEVEL_KEY) ?? '';
  }

  private static loadData(): void {
    const data = SessionStorageManager.get(GameManager.GAME_DATA_KEY);
    if (!GameManager.levels.size && data) {
      GameManager.levels = new Map(Object.entries(JSON.parse(data)));
    }
  }

  static get currentLevel(): ILevel | null {
    GameManager.loadData();
    return GameManager.levels.get(GameManager.currentLevelId) ?? null;
  }

  static get levelValues(): ILevelValue[] {
    GameManager.loadData();
    const prizesForLevels: ILevelValue[] = [];
    GameManager.levels.forEach(({ prize }, levelId) =>
      prizesForLevels.push({ prize, levelId }),
    );
    return prizesForLevels;
  }

  static isLevelPassed(levelId: string): boolean {
    const currentLevelId = Number(GameManager.currentLevelId);
    return Number(levelId) < currentLevelId;
  }

  static get gameStatus(): GameStatus {
    const sessionGameStatus = SessionStorageManager.get(
      GameManager.GAME_STATUS_KEY,
    ) as GameStatus;
    return sessionGameStatus || GameStatus.START;
  }

  static get isOngoingGame(): boolean {
    return (
      SessionStorageManager.get(GameManager.GAME_STATUS_KEY) ===
      GameStatus.PLAYING
    );
  }

  static get isAbleToStart(): boolean {
    const sessionGameStatus = SessionStorageManager.get(
      GameManager.GAME_STATUS_KEY,
    );
    return sessionGameStatus === GameStatus.START || !sessionGameStatus;
  }

  static get isGameOver(): boolean {
    return (
      SessionStorageManager.get(GameManager.GAME_STATUS_KEY) === GameStatus.OVER
    );
  }

  static startNewGame(): void {
    SessionStorageManager.clear();
    SessionStorageManager.set(GameManager.GAME_STATUS_KEY, GameStatus.START);
  }

  static goToNextLevel = (): boolean => {
    const newLevel = Number(GameManager.currentLevelId) + 1;
    const isNextLevelExist = GameManager.levels.get(newLevel.toString());
    if (isNextLevelExist) {
      SessionStorageManager.set(GameManager.LEVEL_KEY, newLevel.toString());
      return true;
    }
    return false;
  };

  static finishGame(): void {
    SessionStorageManager.set(GameManager.GAME_STATUS_KEY, GameStatus.OVER);
  }

  static async playGame(): Promise<void> {
    const startGame = () => {
      SessionStorageManager.set(
        GameManager.GAME_STATUS_KEY,
        GameStatus.PLAYING,
      );
      SessionStorageManager.set(GameManager.LEVEL_KEY, '1');
    };

    if (GameManager.levels.size) {
      return Promise.resolve().then(startGame);
    }
    return axios
      .get('http://localhost:8080/')
      .then(({ data }: { data: IGameData }) => {
        startGame();
        GameManager.levels = new Map(Object.entries(data));
        SessionStorageManager.set(
          GameManager.GAME_DATA_KEY,
          JSON.stringify(data),
        );
      })
      .catch(() => {
        toast(`Oh no, error! Please, try again later :(`);
      });
  }

  static getAnswerForCurrentLevel(): IChoice | null {
    return (
      GameManager.levels
        .get(GameManager.currentLevelId)
        ?.question.choices.find((choice) => choice.correct) ?? null
    );
  }
}
