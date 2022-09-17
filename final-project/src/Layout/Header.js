import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "../App.css";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <Navbar className="bgNavbar">
        <Container>
          <Navbar.Brand className="navColorBrand">Prime&amp;Risk</Navbar.Brand>
          <Nav className="me-auto">
            <Link className="navColor" to="/home">
              Home
            </Link>
            <Link className="navColor" to="/game">
              Games
            </Link>
            <Link className="navColor" to="/movie">
              Movie
            </Link>
            <Link className="navColor" to="/game/table">
              List Game
            </Link>
            <Link className="navColor" to="/Movie/table">
              List Movie
            </Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};
export default Header;
