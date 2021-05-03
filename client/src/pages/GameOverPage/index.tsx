import './styles.css';
import Hand from '@game/assets/img/hand.svg';
import GameManager from '@game/helpers/GameManager';
import { formatMoney } from '@game/helpers/utils';
import ControlButton from '@game/components/ControlButton';
import useGameFlow from '@game/helpers/hooks';

const MAIN_CLASS = 'gameover-page';

const GameOverPage = () => {
  const { newGame } = useGameFlow();
  return (
    <div className={MAIN_CLASS}>
      <Hand className="hand-icon" />
      <div className={`${MAIN_CLASS}__content`}>
        <h2 className={`${MAIN_CLASS}__result`}>
          <span>Total score:</span>
          {`$${formatMoney(GameManager.currentLevel?.prize ?? 0)} earned`}
        </h2>
      </div>
      <ControlButton text="Try again" onClick={newGame} />
    </div>
  );
};

export default GameOverPage;
