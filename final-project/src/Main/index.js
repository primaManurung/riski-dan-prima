import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "../Layout/Header";
import HomeGame from "./HomeGame";
import DetailGame from "./DetailGame";
import FormGame from "./FormGame";
import TableGame from "./TableGame";
import ButtonSearch from "./ButtonSearch";
import Footer from "../Layout/Footer";
import MovieHome from "../Movie/MovieHome";
import MovieTable from "../Movie/MovieTable";

const Routes = () => {
  return (
    <Router>
      <>
        <Header />
        <Switch>
          <Route exact path="/movie">
            <MovieHome />
          </Route>
          <Route exact path="/game">
            <HomeGame />
          </Route>
          <Route exact path="/game/table">
            <TableGame />
          </Route>
          <Route exact path="/movie/table">
            <MovieTable />
          </Route>
          <Route exact path="/game/:id/detail"></Route>
          <Route exact path="/game/edit/:id/">
            <FormGame />
          </Route>
          <Route exact path="/game/table/create">
            <FormGame />
          </Route>
        </Switch>
        <Footer />
      </>
    </Router>
  );
};
export default Routes;
