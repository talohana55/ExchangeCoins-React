import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import HomePage from "./Routs/HomePage";
import CoinValue from "./Routs/CoinValue";

function App() {
  return (
    <Router>
      <main>
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>

          <Route path="/coinvalue" exact>
            <CoinValue />
          </Route>

          <Redirect to="/" />
        </Switch>
      </main>
    </Router>
  );
}

export default App;
