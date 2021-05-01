import { useEffect, useMemo, useState } from 'react';
import { useHistory } from 'react-router';
import { ROUTES } from './constants';
import GameManager from './GameManager';
import { IAnswerChoice, ILevel } from './models';

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
    GameManager.goToNextLevel();
    setCurrentLevel(GameManager.currentLevel);
  };

  const endGame = (): void => {
    GameManager.finishGame();
    history.push(ROUTES.end);
    setCurrentLevel(null);
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

  const chooseAnswer = (answer: string): void => {
    const isCorrectAnswer = GameManager.isCorrectAnswer(answer);
    isCorrectAnswer ? moveToNextLevel() : endGame();
  };

  return {
    currentLevel,
    newGame,
    playGame,
    chooseAnswer,
  };
};
