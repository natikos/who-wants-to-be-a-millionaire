import { ROUTES } from './constants';
import GameManager from './GameManager';

export const getRedirectRoute = (): string => {
  if (GameManager.isOngoingGame) return ROUTES.game;
  if (GameManager.isGameOver) return ROUTES.end;
  GameManager.startNewGame();
  return ROUTES.start;
};

export const formatMoney = (value: number): string => value.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
