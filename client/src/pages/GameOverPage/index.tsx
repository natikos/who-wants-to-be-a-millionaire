import './styles.css';
import Hand from '../../assets/img/hand.svg';
import GameManager from '../../helpers/GameManager';
import { formatMoney } from '../../helpers/utils';
import ControlButton from '../../components/ControlButton';
import { useGameFlow } from '../../helpers/hooks';

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
