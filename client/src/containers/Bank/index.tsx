import { FC, ReactElement } from 'react';
import './styles.css';

interface IBankProps {
  className?: string;
}

const Bank: FC<IBankProps> = ({ className }): ReactElement => {
  return <div className={className}>Bank!</div>;
};

export default Bank;
