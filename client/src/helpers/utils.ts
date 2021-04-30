import { ROUTES } from './constants';
import GameManager from './GameManager';

export const getRedirectRoute = (): string => {
  if (GameManager.isOngoingGame) return ROUTES.game;
  if (GameManager.isGameOver) return ROUTES.end;
  return ROUTES.start;
};
