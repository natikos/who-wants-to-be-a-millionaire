import Bank from '@game/containers/Bank';
import Playground from '@game/containers/Playground';
import useGameFlow from '@game/helpers/hooks';
import './styles.css';

const MAIN_CLASS = 'game-page';

const GamePage = () => {
  const game = useGameFlow();

  return (
    <div className={MAIN_CLASS}>
      <Playground {...game} />
      <Bank {...game} className={`${MAIN_CLASS}__bank_desktop`} />
    </div>
  );
};

export default GamePage;
