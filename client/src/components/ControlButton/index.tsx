import './styles.css';

interface IControlButtonProps {
  text: string;
  onClick(): void;
}

const MAIN_CLASS = 'control-button';

const ControlButton = ({ text, onClick }: IControlButtonProps) => (
  <button className={MAIN_CLASS} type="button" onClick={onClick}>
    {text}
  </button>
);

export default ControlButton;
