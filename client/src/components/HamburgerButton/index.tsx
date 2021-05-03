import { ReactElement } from 'react';
import Menu from '../../assets/img/menu.svg';
import Close from '../../assets/img/close.svg';
import './styles.css';

interface IHamburgerButton {
  isOpen?: boolean;
  onClick(): void;
}

const HamburgerButton = ({
  onClick,
  isOpen,
}: IHamburgerButton): ReactElement => (
  <button type="button" className="hamburger-button" onClick={onClick}>
    {isOpen ? <Close /> : <Menu />}
  </button>
);

export default HamburgerButton;
