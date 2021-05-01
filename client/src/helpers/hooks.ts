import { useEffect, useMemo, useState } from 'react';
import { useHistory } from 'react-router';
import { ROUTES } from './constants';
import GameManager from './GameManager';
import { IChoice, ILevel } from './models';

export const useGameFlow = () => {
  const [currentLevel, setCurrentLevel] = useState<ILevel | null>(null);
  const history = useHistory();

  const level = useMemo(() => GameManager.currentLevel, [
    GameManager.currentLevel?.prize,
  ]);

  useEffect(() => {
    setCurrentLevel(GameManager.currentLevel);
  }, [setCurrentLevel, level]);

  const moveToNextLevel = (): void => {
    const isNextLevelExist = GameManager.goToNextLevel();
    if (isNextLevelExist) {
      setCurrentLevel(GameManager.currentLevel);
    } else {
      endGame();
    }
  };

  const endGame = (): void => {
    GameManager.finishGame();
    setCurrentLevel(null);
    history.push(ROUTES.end);
  };

  const newGame = (): void => {
    GameManager.startNewGame();
    setCurrentLevel(GameManager.currentLevel);
    history.push(ROUTES.start);
  };

  const playGame = (): void => {
    GameManager.playGame().then(() => {
      history.push(ROUTES.game);
    });
  };

  const getAnswer = (): IChoice | null => {
    return GameManager.getAnswerForCurrentLevel();
  };

  return {
    currentLevel,
    newGame,
    endGame,
    moveToNextLevel,
    playGame,
    getAnswer,
    levelValues: GameManager.levelValues,
  };
};
