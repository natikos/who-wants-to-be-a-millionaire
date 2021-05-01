import { FC, ReactElement } from 'react';
import BankItem from '../../components/BankItem';
import GameManager from '../../helpers/GameManager';
import { ILevelValue, LevelValueState } from '../../helpers/types';
import './styles.css';

export interface IBankProps {
  className?: string;
  levelValues: ILevelValue[];
}

const Bank: FC<IBankProps> = ({
  className = '',
  levelValues,
}): ReactElement => {
  const getBankItemState = (levelId: string): LevelValueState => {
    if (GameManager.isLevelPassed(levelId)) {
      return 'passed';
    } else if (GameManager.currentLevelId === levelId) {
      return 'current';
    }
    return 'upcoming';
  };

  return (
    <div className={`bank ${className}`}>
      {levelValues.map(({ levelId, prize }) => (
        <BankItem
          key={levelId}
          value={prize}
          state={getBankItemState(levelId)}
        />
      ))}
    </div>
  );
};

export default Bank;
