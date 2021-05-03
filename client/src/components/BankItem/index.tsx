import { ReactElement } from 'react';
import { LevelValueState } from '../../helpers/types';
import { formatMoney } from '../../helpers/utils';
import './styles.css';

interface IBankItemProps {
  value: number;
  state?: LevelValueState;
}
const MAIN_CLASS = 'bank-item';

const BankItem = ({
  value,
  state = 'upcoming',
}: IBankItemProps): ReactElement => (
  <svg
    className={`${MAIN_CLASS} ${MAIN_CLASS}_${state}`}
    viewBox="0 0 376 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path className={`${MAIN_CLASS}__left-decor`} d="M69 20H0" />
    <path className={`${MAIN_CLASS}__right-decor`} d="M376 20H307" />
    <path
      className={`${MAIN_CLASS}__box`}
      d="M81.4526 4.63788C83.6376 2.01596 86.8742 0.5 90.2872 0.5H285.713C289.126 0.5 292.362 2.01597 294.547 4.63788L307.349 20L294.547 35.3621C292.362 37.984 289.126 39.5 285.713 39.5H90.2872C86.8742 39.5 83.6376 37.984 81.4526 35.3621L68.6509 20L81.4526 4.63788Z"
    />
    <foreignObject x="68" y="0" width="240" height="40">
      <div className={`${MAIN_CLASS}__content`}>
        <span>
          $
          {formatMoney(value)}
        </span>
      </div>
    </foreignObject>
  </svg>
);

export default BankItem;
