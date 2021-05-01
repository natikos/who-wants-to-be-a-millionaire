import { IGameData, ILevel } from './models';
import SessionStorageManager from './SessionStorageManager';
import { GameStatus, ILevelValue, LevelValueState } from './types';
import mockdata from './mock.json';
import axios from 'axios';

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

  static goToNextLevel = (): void => {
    const newLevel = Number(GameManager.currentLevelId) + 1;
    SessionStorageManager.set(GameManager.LEVEL_KEY, newLevel.toString());
  };

  static finishGame(): void {
    SessionStorageManager.set(GameManager.GAME_STATUS_KEY, GameStatus.OVER);
  }

  static async playGame(): Promise<void> {
    // MOCK ASYNC REQUEST
    return axios.get('https://jsonplaceholder.typicode.com/users').then(() => {
      const data = (mockdata as any) as IGameData;
      SessionStorageManager.set(
        GameManager.GAME_STATUS_KEY,
        GameStatus.PLAYING,
      );
      GameManager.levels = new Map(Object.entries(data));
      SessionStorageManager.set(GameManager.LEVEL_KEY, '1');
      SessionStorageManager.set(
        GameManager.GAME_DATA_KEY,
        JSON.stringify(data),
      );
    });
  }

  static isCorrectAnswer(value: string): boolean {
    const isCorrect = GameManager.levels
      .get(GameManager.currentLevelId)
      ?.data.choices.find((choice) => choice.value === value)?.correct;

    return Boolean(isCorrect);
  }
}
