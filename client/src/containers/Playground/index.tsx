import { ReactElement } from 'react';
import AnswerButton from '../../components/AnswerButton';
import { ALPHABET } from '../../helpers/constants';
import { useGameFlow } from '../../helpers/hooks';
import './styles.css';

const MAIN_CLASS = 'playground';

const Playground = (): ReactElement => {
  const { currentLevel, chooseAnswer } = useGameFlow();

  return (
    <div className={MAIN_CLASS}>
      <h2>{currentLevel?.data.question}</h2>
      <div className={`${MAIN_CLASS}_choices`}>
        {currentLevel?.data.choices.map(({ value, label }, index) => (
          <AnswerButton
            key={value}
            value={value}
            label={label}
            letter={ALPHABET[index]}
            onChooseAnswer={() => chooseAnswer(value)}
          />
        ))}
      </div>
    </div>
  );
};

export default Playground;
