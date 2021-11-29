import { Router, Switch, Route } from 'react-router-dom';
import browserHistory from '../../browser-history';
import { AppRoute } from '../../const';
import RootScreen from '../root-screen/root-screen';
import LoginScreen from '../login-screen/login-screen';
import MovieScreen from '../movie-screen/movie-screen';
import MyListScreen from '../mylist-screen/mylist-screen';
import AddReviewScreen from '../add-review-screen/add-review-screen';
import PlayerScreen from '../player-screen/player-screen';

function App(): JSX.Element {
  return (
    <Router history={browserHistory}>
      <Switch>
        <Route path={AppRoute.Root} exact>
          <RootScreen />
        </Route>
        <Route path={AppRoute.Login} exact>
          <LoginScreen />
        </Route>
        <Route path={`${AppRoute.Movie}/:id`} exact>
          <MovieScreen />
        </Route>
        <Route path={AppRoute.MyList} exact>
          <MyListScreen />
        </Route>
        <Route path={`${AppRoute.Movie}/:id${AppRoute.Review}`} exact>
          <AddReviewScreen />
        </Route>
        <Route path={`${AppRoute.Player}/:id`} exact>
          <PlayerScreen />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
