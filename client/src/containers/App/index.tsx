import { ReactElement } from 'react';
import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import GameOverPage from '../../pages/GameOverPage';
import GamePage from '../../pages/GamePage';
import StartPage from '../../pages/StartPage';
import GameRoute from '../../components/core/GameRoute';
import { ROUTES } from '../../helpers/constants';
import { getRedirectRoute } from '../../helpers/utils';
import './styles.css';

const App = (): ReactElement => (
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
);

export default App;
