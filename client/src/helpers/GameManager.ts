import SessionStorageManager from './SessionStorageManager';
import { GameStatus } from './types';

export default class GameManager {
  private static readonly LEVEL_KEY = 'level';

  private static readonly GAME_STATUS_KEY = 'gameStatus';

  static get currentLevel(): number {
    const level = SessionStorageManager.get(GameManager.LEVEL_KEY);
    return Number(level);
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

  static goToNextLevel = (): void => {
    const currentLevel = Number(
      SessionStorageManager.get(GameManager.LEVEL_KEY),
    );
    const newLevel = currentLevel + 1;
    SessionStorageManager.set(GameManager.LEVEL_KEY, newLevel.toString());
  };

  static startNewGame(): void {
    SessionStorageManager.clear();
    SessionStorageManager.set(GameManager.GAME_STATUS_KEY, GameStatus.START);
  }

  static finishGame(): void {
    SessionStorageManager.set(GameManager.GAME_STATUS_KEY, GameStatus.OVER);
  }

  static playGame(): void {
    SessionStorageManager.set(GameManager.GAME_STATUS_KEY, GameStatus.PLAYING);
  }
}
