import { FC, ReactElement } from 'react';
import { Route, Redirect } from 'react-router-dom';
import GameManager from '../../helpers/GameManager';
import { RoutePath } from '../../helpers/types';
import { getRedirectRoute } from '../../helpers/utils';

interface IGameRouteProps {
  path: RoutePath;
}

const GameRoute: FC<IGameRouteProps> = ({ children, path }): ReactElement => {
  const canActivate = () => {
    switch (path) {
      case '/start': {
        return GameManager.isAbleToStart;
      }
      case '/end': {
        return GameManager.isGameOver;
      }
      case '/': {
        return GameManager.isOngoingGame;
      }
      default: {
        return false;
      }
    }
  };

  return canActivate() ? (
    <Route path={path} exact>
      {children}
    </Route>
  ) : (
    <Redirect to={getRedirectRoute()} />
  );
};

export default GameRoute;
