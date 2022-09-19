import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "../Layout/Header";
import HomeGame from "./HomeGame";
import DetailGame from "./DetailGame";
import TableGame from "./TableGame";
import Footer from "../Layout/Footer"
import MovieHome from "../Movie/MovieHome";
import MovieTable from "../Movie/MovieTable";
import MovieDetail from "../Movie/MovieDetail";
import MovieForm from "../Movie/MovieForm";
import MovieTest from "../Movie/MovieTest";



const Routes = () => {
  return (
    <Router>
      <>
        <Header />
        <Switch>
          <Route exact path="/movie">
            <MovieHome/>
          </Route>
          <Route exact path="/game">
            <HomeGame />
          </Route>
          <Route exact path="/game/table">
            <TableGame />
          </Route>
          <Route exact path="/movie/table">
            <MovieTest />
          </Route>
          <Route exact path="/game/:id/detail">
            <DetailGame/>
          </Route>
          <Route exact path="/movie/:id/detail">
            <MovieDetail/>
          </Route>
          <Route exact path="/movie/:id/edit">
            <MovieForm/>
          </Route>
          <Route exact path="/movie/create">
            <MovieForm/>
          </Route>
        </Switch>
        <Footer/>
      </>
    </Router>
  );
};
export default Routes;
