import { useHistory } from 'react-router';
import { ROUTES } from './constants';
import GameManager from './GameManager';

export const useGameFlow = () => {
  const history = useHistory();

  const endGame = (): void => {
    GameManager.finishGame();
    history.push(ROUTES.end);
  };

  const newGame = (): void => {
    GameManager.startNewGame();
    history.push(ROUTES.start);
  };

  const playGame = (): void => {
    GameManager.playGame();
    history.push(ROUTES.game);
  };

  return {
    newGame,
    playGame,
    endGame,
  };
};
