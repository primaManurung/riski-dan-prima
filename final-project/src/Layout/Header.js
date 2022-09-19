import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "../App.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../Auth/UserContext";

const Header = () => {
  const [user, setUser] = useContext(UserContext);
  const logout = () => {
    setUser(null);
    alert("Logout Sukses");
    localStorage.clear();
  };
  return (
    <>
      <Navbar className={user ? ` bgNavbar` : `bgNavbar`}>
        <Container>
          {user ? (
            <>
              {" "}
              <Navbar.Brand className="navColorBrand">
                Prime&amp;Risk
              </Navbar.Brand>
            </>
          ) : (
            <>
              <Navbar.Brand className="navColorBrand">
                Prime&amp;Risk
              </Navbar.Brand>
            </>
          )}

          <Nav className="me-auto textCenter">
            <Link className="navColor keyFont" to="/game">
              Games
            </Link>
            <Link className="navColor keyFont" to="/movie">
              Movie
            </Link>

            {user ? (
              <span onClick={logout} className="navColor">
                Logout
              </span>
            ) : (
              <>
                <Link className="navColor" to="/register">
                  Register
                </Link>{" "}
                <Link className="navColor" to="/login">
                  Login
                </Link>
              </>
            )}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};
export default Header;
