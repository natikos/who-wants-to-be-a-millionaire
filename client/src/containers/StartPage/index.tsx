import { ReactElement } from 'react';
import Button from '../../components/Button';
import Hand from '../../assets/img/hand.svg';
import { MAIN_CLASS, START_TITLE } from './constants';
import './styles.css';

const StartPage = (): ReactElement => (
  <div className={MAIN_CLASS}>
    <div className={`${MAIN_CLASS}__content`}>
      <Hand className="hand-icon" />
      <div>
        <h1 className={`${MAIN_CLASS}__title`}>{START_TITLE}</h1>
        <Button text="Start" onClick={() => console.log('click')} />
      </div>
    </div>
  </div>
);

export default StartPage;
