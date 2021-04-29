import './styles.css';

interface IButtonProps {
  text: string;
  onClick(): void;
}

const Button = ({ text, onClick }: IButtonProps) => (
  <button className="button" type="button" onClick={onClick}>
    {text}
  </button>
);

export default Button;
