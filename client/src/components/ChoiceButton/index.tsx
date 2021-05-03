import { ReactElement } from 'react';
import { ChoiceState, IOnChooseAnswer } from '../../helpers/types';
import './styles.css';

interface IChoiceButtonProps {
  value: string;
  label: string;
  letter: string;
  disabled?: boolean;
  onChooseAnswer: IOnChooseAnswer;
  state?: ChoiceState;
}

const MAIN_CLASS = 'choice-button';

const ChoiceButton = (props: IChoiceButtonProps): ReactElement => {
  const {
    letter,
    onChooseAnswer,
    value,
    label,
    disabled,
    state = 'inactive',
  } = props;
  return (
    <button
      type="button"
      disabled={disabled}
      className={`${MAIN_CLASS} ${MAIN_CLASS}_${state}`}
      onClick={() => onChooseAnswer(value)}
    >
      <svg viewBox="0 0 320 56" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path className={`${MAIN_CLASS}__decor_left`} d="M303 28L320 28" />
        <path className={`${MAIN_CLASS}__decor_right`} d="M0 28L17 28" />
        <path
          className={`${MAIN_CLASS}__box`}
          d="M32.8175 5.31576C34.9762 2.29361 38.4615 0.5 42.1754 0.5H277.825C281.539 0.5 285.024 2.29361 287.183 5.31576L303.386 28L287.183 50.6842C285.024 53.7064 281.539 55.5 277.825 55.5H42.1754C38.4615 55.5 34.9762 53.7064 32.8175 50.6842L16.6145 28L32.8175 5.31576Z"
        />
        <foreignObject x="20" y="0" width="280" height="56">
          <div className={`${MAIN_CLASS}__content`}>
            <span className={`${MAIN_CLASS}__letter`}>{letter}</span>
            <div className={`${MAIN_CLASS}__content-scrollable`}>
              <span className={`${MAIN_CLASS}__label`}>{label}</span>
            </div>
          </div>
        </foreignObject>
      </svg>
    </button>
  );
};

export default ChoiceButton;
