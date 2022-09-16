import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "../Layout/Header";
import HomeGame from "./HomeGame";
import DetailGame from "./DetailGame";
import TableGame from "./TableGame";
const Routes = () => {
  return (
    <Router>
      <>
        <Header />
        <Switch>
          <Route exact path="/movie"></Route>
          <Route exact path="/game">
            <HomeGame />
          </Route>
          <Route exact path="/game/table">
            <TableGame />
          </Route>
          <Route exact path="/game/:id/detail"></Route>
        </Switch>
      </>
    </Router>
  );
};
export default Routes;
