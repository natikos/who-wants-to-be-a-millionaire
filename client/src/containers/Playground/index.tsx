import { ReactElement } from 'react';
import AnswerButton from '../../components/AnswerButton';
import { ALPHABET } from '../../helpers/constants';
import { useGameFlow } from '../../helpers/hooks';
import MobileBank from '../MobileBank';
import './styles.css';

const MAIN_CLASS = 'playground';

const Playground = (): ReactElement => {
  const { currentLevel, chooseAnswer } = useGameFlow();

  return (
    <div className={MAIN_CLASS}>
      <MobileBank />
      <p className={`${MAIN_CLASS}__question`}>{currentLevel?.data.question}</p>
      <div className={`${MAIN_CLASS}__choices`}>
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
