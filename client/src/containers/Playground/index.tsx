import { ReactElement, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import ChoiceButton from '@game/components/ChoiceButton';
import {
  ALPHABET,
  GO_NEXT_DELAY,
  SHOWING_ANSWER_DELAY,
} from '@game/helpers/constants';
import { IChoice, ILevel } from '@game/helpers/models';
import { ChoiceState } from '@game/helpers/types';
import { IBankProps } from '../Bank';
import MobileBank from '../MobileBank';
import './styles.css';

const MAIN_CLASS = 'playground';

interface IPlaygroundProps extends IBankProps {
  currentLevel: ILevel | null;
  getAnswer(): IChoice | null;
  moveToNextLevel(): void;
  endGame(): void;
}

const Playground = (props: IPlaygroundProps): ReactElement => {
  const {
    getAnswer, moveToNextLevel, endGame, currentLevel, levelValues,
  } = props;
  const [answer, setAnswer] = useState<IChoice | null>(null);
  const [selectedChoice, setSelectedChoice] = useState<IChoice | null>(null);
  const [waitForAnswer, setWaitForAnswer] = useState(false);

  useEffect(() => {
    if (answer) {
      let resultTimer: ReturnType<typeof setTimeout> | null = null;

      const showAnswerTimer = setTimeout(() => {
        setWaitForAnswer(false);
        const delayInSec = GO_NEXT_DELAY / 1000;
        const isNextLevel = selectedChoice?.value === answer?.value;
        const toastStateClass = isNextLevel ? 'success' : 'failure';
        toast(
          isNextLevel
            ? `Hurray! Going to next level in ${delayInSec}s!`
            : `Oh, so sad! Finishing game in ${delayInSec}s :(`,
          {
            autoClose: GO_NEXT_DELAY,
            className: `notification_${toastStateClass}`,
          },
        );
        resultTimer = setTimeout(() => {
          // eslint-disable-next-line @typescript-eslint/no-use-before-define
          clearTimeouts();
          if (isNextLevel) {
            moveToNextLevel();
            setAnswer(null);
          } else {
            endGame();
          }
          setSelectedChoice(null);
        }, GO_NEXT_DELAY);
      }, SHOWING_ANSWER_DELAY);

      const clearTimeouts = () => {
        clearTimeout(showAnswerTimer);
        if (resultTimer) {
          clearTimeout(resultTimer);
        }
      };

      return clearTimeouts;
    }
  }, [answer]);

  const onClick = (choice: IChoice): void => {
    setWaitForAnswer(true);
    setSelectedChoice(choice);
    setAnswer(getAnswer());
  };

  const getChoiceState = (choice: IChoice): ChoiceState => {
    if (
      !waitForAnswer
      && selectedChoice
      && choice.value === selectedChoice.value
    ) {
      return choice.value === answer?.value ? 'correct' : 'wrong';
    }
    if (!waitForAnswer && choice.value === answer?.value) {
      return 'correct';
    }
    return choice.value === selectedChoice?.value ? 'selected' : 'inactive';
  };

  return (
    <div className={MAIN_CLASS}>
      <MobileBank levelValues={levelValues} />
      <p className={`${MAIN_CLASS}__question`}>
        {currentLevel?.question.value}
      </p>
      <div className={`${MAIN_CLASS}__choices`}>
        {currentLevel?.question.choices.map((item, index) => (
          <ChoiceButton
            disabled={waitForAnswer || !!selectedChoice}
            state={getChoiceState(item)}
            key={item.value}
            value={item.value}
            label={item.label}
            letter={ALPHABET[index]}
            onChooseAnswer={() => onClick(item)}
          />
        ))}
      </div>
    </div>
  );
};

export default Playground;
