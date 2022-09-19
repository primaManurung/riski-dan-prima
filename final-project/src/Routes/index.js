import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Header from "../Layout/Header";
import HomeGame from "../Game/HomeGame";
import DetailGame from "../Game/DetailGame";
import TableGame from "../Game/TableGame";
import FormGame from "../Game/FormGame";
import Footer from "../Layout/Footer";
import MovieHome from "../Movie/MovieHome";

import Register from "../Auth/Register";
import Login from "../Auth/Login";
import { useContext } from "react";
import { UserContext } from "../Auth/UserContext";
import Change from "../Auth/Change";
import { useHistory } from "react-router-dom";
import MovieTable from "../Movie/MovieTable";
import MovieForm from "../Movie/MovieForm";
import MovieDetail from "../Movie/MovieDetail";

const Routes = () => {
  const [user] = useContext(UserContext);
  let history = useHistory();
  const PrivateRoute = ({ ...rest }) => {
    if (user) {
      return <Route {...rest} />;
    } else {
      return <Redirect to="/login" />;
    }
  };

  const LoginRoute = ({ ...rest }) => {
    if (user) {
      return <Redirect to="/game" />;
    } else {
      return <Route {...rest} />;
    }
  };

  return (
    <>
      <Router>
        <>
          {" "}
          <Header />
          <Switch>
            <Route exact path="/movie">
              <MovieHome />
            </Route>
            <Route exact path="/change-password">
              <Change />
            </Route>
            <Route exact path="/">
              <HomeGame />
            </Route>
            <Route exact path="/game">
              <HomeGame />
            </Route>
            <Route exact path="/game/table">
              <TableGame />
            </Route>
            <PrivateRoute exact path="/game/table/create">
              <FormGame />
            </PrivateRoute>
            <PrivateRoute exact path="/movie/table/create">
              <MovieForm />
            </PrivateRoute>
            <PrivateRoute exact path="/game/table/:id/edit">
              <FormGame />
            </PrivateRoute>
            <PrivateRoute exact path="/movie/table/:id/edit">
              <MovieForm />
            </PrivateRoute>
            <Route exact path="/game/:id/detail">
              <DetailGame />
            </Route>
            <Route exact path="/movie/:id/detail">
              <MovieDetail />
            </Route>
            <Route exact path="/movie/table">
              <MovieTable />
            </Route>
            <LoginRoute exact path="/register">
              <Register />
            </LoginRoute>
            <LoginRoute exact path="/login">
              <Login />
            </LoginRoute>
          </Switch>
          <Footer />
        </>
      </Router>
    </>
  );
};
export default Routes;
