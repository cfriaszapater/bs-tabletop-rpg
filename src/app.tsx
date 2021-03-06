import React from "react";
import { connect } from "react-redux";
import { Route, Router } from "react-router-dom";
import { ThunkDispatch } from "redux-thunk";
import CharacterView from "./components/character/characterView";
import CombatView from "./components/combat/combatView";
import { LoginPage } from "./components/login/loginPage";
import MenuView from "./components/menu/MenuView";
import { PrivateRoute } from "./components/privateRoute";
import { RegisterPage } from "./components/register/registerPage";
import { alertActions } from "./store/alert/alertActions";
import { Alert } from "./store/alert/types";
import { Character } from "./store/character/types";
import { AppState } from "./store/rootReducer";
import { history } from "./util/history";

class App extends React.Component<AppProps> {
  constructor(props: AppProps) {
    super(props);

    history.listen(() => {
      // clear alert on location change
      props.dispatch(alertActions.clear());
    });
  }

  public render() {
    const { alert } = this.props;
    return (
      <div className="App">
        {alert.message && (
          <div className={`alert ${alert.type}`}>{alert.message}</div>
        )}
        <Router history={history}>
          <div>
            <PrivateRoute exact path="/" component={MenuView} />
            <PrivateRoute
              exact
              path="/characters/:characterId"
              component={CharacterView}
            />
            <PrivateRoute
              exact
              path="/characters"
              component={CharactersListView}
            />
            <PrivateRoute exact path="/combat" component={CombatView} />
            <Route path="/login" component={LoginPage} />
            <Route path="/register" component={RegisterPage} />
          </div>
        </Router>
      </div>
    );
  }
}

interface AppProps {
  dispatch: ThunkDispatch<{}, {}, any>;
  character?: Character;
  loading: boolean;
  error: Error | null;
  alert: Alert;
}

const mapStateToProps = (state: AppState) => ({
  alert: state.alert,
  character: state.character.character,
  error: state.character.error,
  loading: state.character.loading
});

export default connect(mapStateToProps)(App);

function CharactersListView() {
  return <div>This will be the list of characters</div>;
}
