import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "../Layout/Header";
import MovieHome from "./MovieHome";
// import DetailMovie from "./DetailMovie";
// import MovieTable from "../MovieTable";
import Footer from "../Layout/Footer"
const MovieRoutes = () => {
  return (
    <Router>
      <>
        <Header />
        <Switch>
          <Route exact path="/movie"></Route>
          <Route exact path="/movie">
            <MovieHome />
          </Route>
          {/* <Route exact path="/Movie/table">
            <MovieTable />
          </Route> */}
          <Route exact path="/movie/:id/detail"></Route>
        </Switch>
        <Footer/>
      </>
    </Router>
  );
};
export default MovieRoutes;
