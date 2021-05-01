import Bank from '../../containers/Bank';
import Playground from '../../containers/Playground';
import './styles.css';

const MAIN_CLASS = 'game-page';

const GamePage = () => {
  return (
    <div className={MAIN_CLASS}>
      <Playground />
      <Bank className={`${MAIN_CLASS}__bank_desktop`} />
    </div>
  );
};

export default GamePage;
