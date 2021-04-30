import './styles.css';

interface IButtonControlProps {
  text: string;
  onClick(): void;
}

const ButtonControl = ({ text, onClick }: IButtonControlProps) => (
  <button className="button" type="button" onClick={onClick}>
    {text}
  </button>
);

export default ButtonControl;
