import { ReactElement } from 'react';
import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { GameOverPage, StartPage, GamePage } from '@game/pages';
import GameRoute from '@game/components/core/GameRoute';
import { ROUTES } from '@game/helpers/constants';
import { getRedirectRoute } from '@game/helpers/utils';
import ErrorBoundary from '@game/containers/ErrorBoundary';
import 'react-toastify/dist/ReactToastify.css';

const App = (): ReactElement => (
  <ErrorBoundary>
    <Router>
      <Switch>
        <GameRoute path={ROUTES.start}>
          <StartPage />
        </GameRoute>
        <GameRoute path={ROUTES.end}>
          <GameOverPage />
        </GameRoute>
        <GameRoute path={ROUTES.game}>
          <GamePage />
        </GameRoute>
        <Redirect to={getRedirectRoute()} />
      </Switch>
    </Router>
    <ToastContainer
      className="notification"
      progressClassName="notification__progressbar"
      bodyClassName="notification__content"
      closeOnClick={false}
      pauseOnHover={false}
      pauseOnFocusLoss={false}
      closeButton={false}
    />
  </ErrorBoundary>
);

export default App;
