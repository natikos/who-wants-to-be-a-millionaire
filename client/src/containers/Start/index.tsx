import { ReactElement } from 'react';
import Button from '../../components/Button';
import { MAIN_CLASS, START_TITLE } from './constants';
import './styles.css';

const StartPage = (): ReactElement => (
  <div className={MAIN_CLASS}>
    <div className={`${MAIN_CLASS}__content`}>
      <img
        className="start-page__hand"
        src="../assets/hand.png"
        alt="Hand with stars"
      />
      <div>
        <h1 className={`${MAIN_CLASS}__title`}>{START_TITLE}</h1>
        <Button text="Start" onClick={() => console.log('click')} />
      </div>
    </div>
  </div>
);

export default StartPage;
