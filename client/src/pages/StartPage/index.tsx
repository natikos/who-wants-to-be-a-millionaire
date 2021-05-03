import { ReactElement } from 'react';
import ControlButton from '@game/components/ControlButton';
import Hand from '@game/assets/img/hand.svg';
import useGameFlow from '@game/helpers/hooks';
import './styles.css';

const MAIN_CLASS = 'start-page';

const StartPage = (): ReactElement => {
  const { playGame } = useGameFlow();

  return (
    <div className={MAIN_CLASS}>
      <div className={`${MAIN_CLASS}__content`}>
        <Hand className="hand-icon" />
        <div>
          <h1 className={`${MAIN_CLASS}__title`}>
            Who wants to be a millionaire?
          </h1>
          <ControlButton text="Start" onClick={playGame} />
        </div>
      </div>
    </div>
  );
};

export default StartPage;
