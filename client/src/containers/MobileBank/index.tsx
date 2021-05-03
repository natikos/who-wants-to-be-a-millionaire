import { ReactElement, useState } from 'react';
import HamburgerButton from '@game/components/HamburgerButton';
import Bank, { IBankProps } from '../Bank';
import './styles.css';

const MAIN_CLASS = 'mobile-bank';

const MobileBank = (props: IBankProps): ReactElement | null => {
  const [isModalOpened, setIsModalOpened] = useState(false);
  const menuBtn = (
    <HamburgerButton
      isOpen={isModalOpened}
      onClick={() => setIsModalOpened(!isModalOpened)}
    />
  );

  return (
    <div className={MAIN_CLASS}>
      {menuBtn}
      {isModalOpened && (
        <div className="modal">
          <div className="modal__control">{menuBtn}</div>
          <Bank {...props} />
        </div>
      )}
    </div>
  );
};

export default MobileBank;
