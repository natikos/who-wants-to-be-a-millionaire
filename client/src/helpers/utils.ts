import { ROUTES } from './constants';
import GameManager from './GameManager';

export const getRedirectRoute = (): string => {
  if (GameManager.isOngoingGame) return ROUTES.game;
  if (GameManager.isGameOver) return ROUTES.end;
  return ROUTES.start;
};

export const formatMoney = (value: number): string => {
  return value.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
};
