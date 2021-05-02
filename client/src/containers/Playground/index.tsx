import { ReactElement, useEffect, useState } from 'react';
import ChoiceButton from '../../components/ChoiceButton';
import { ALPHABET } from '../../helpers/constants';
import { IChoice, ILevel } from '../../helpers/models';
import { ChoiceState } from '../../helpers/types';
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
  const { getAnswer, moveToNextLevel, endGame, currentLevel } = props;
  const [answer, setAnswer] = useState<IChoice | null>(null);
  const [selectedChoice, setSelectedChoice] = useState<IChoice | null>(null);
  const [waitForAnswer, setWaitForAnswer] = useState(false);

  useEffect(() => {
    if (answer) {
      let resultTimer: ReturnType<typeof setTimeout> | null = null;

      const showAnswerTimer = setTimeout(() => {
        setWaitForAnswer(false);
        resultTimer = setTimeout(() => {
          clearTimeouts();
          if (selectedChoice?.value === answer?.value) {
            moveToNextLevel();
            setAnswer(null);
          } else {
            endGame();
          }
          setSelectedChoice(null);
        }, 4000);
      }, 2000);

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
      !waitForAnswer &&
      selectedChoice &&
      choice.value === selectedChoice.value
    ) {
      return choice.value === answer?.value ? 'correct' : 'wrong';
    } else if (!waitForAnswer && choice.value === answer?.value) {
      return 'correct';
    }
    return choice.value === selectedChoice?.value ? 'selected' : 'inactive';
  };

  return (
    <div className={MAIN_CLASS}>
      <MobileBank levelValues={props.levelValues} />
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
