import { ReactElement } from 'react';
import Button from '../../components/Button';
import Hand from '../../assets/img/hand.svg';
import { MAIN_CLASS, START_TITLE } from './constants';
import { useGameFlow } from '../../helpers/hooks';
import './styles.css';

const StartPage = (): ReactElement => {
  const { playGame } = useGameFlow();

  return (
    <div className={MAIN_CLASS}>
      <div className={`${MAIN_CLASS}__content`}>
        <Hand className="hand-icon" />
        <div>
          <h1 className={`${MAIN_CLASS}__title`}>{START_TITLE}</h1>
          <Button text="Start" onClick={playGame} />
        </div>
      </div>
    </div>
  );
};

export default StartPage;
