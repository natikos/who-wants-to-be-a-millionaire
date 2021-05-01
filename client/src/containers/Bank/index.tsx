import { FC, ReactElement } from 'react';
import BankItem from '../../components/BankItem';
import GameManager from '../../helpers/GameManager';
import { LevelValueState } from '../../helpers/types';
import './styles.css';

interface IBankProps {
  className?: string;
}

const Bank: FC<IBankProps> = ({ className = '' }): ReactElement => {
  const calculateBankItemState = (levelId: string): LevelValueState => {
    if (GameManager.isLevelPassed(levelId)) {
      return 'passed';
    } else if (GameManager.currentLevelId === levelId) {
      return 'current';
    }
    return 'upcoming';
  };

  return (
    <div className={`bank ${className}`}>
      {GameManager.levelValues.map(({ levelId, prize }) => (
        <BankItem
          key={levelId}
          value={prize}
          state={calculateBankItemState(levelId)}
        />
      ))}
    </div>
  );
};

export default Bank;
