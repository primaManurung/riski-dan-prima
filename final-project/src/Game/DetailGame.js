import axios from "axios";
import { useState, useEffect } from "react";
import "../App.css";
import { useHistory, useParams } from "react-router-dom";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { useContext } from "react";
import { UserContext } from "../Auth/UserContext";
import SideNavMenu from "../Layout/Sidenav";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const ScoreForm = () => {
  let history = useHistory();
  let { id } = useParams();
  const url = "https://super-bootcamp-backend.sanbersy.com";
  const [inputName, setInputName] = useState("");
  const [inputGenre, setInputGenre] = useState("");
  const [inputImg, setInputImg] = useState("");
  const [inputSingle, setInputSingle] = useState("");
  const [inputMulti, setInputMulti] = useState("");
  const [inputRelease, setInputRelease] = useState("");
  const [inputPlatform, setInputPlatform] = useState("");
  const [currentId, setCurrentId] = useState(null);
  const [user, setUser] = useContext(UserContext);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(`${url}/api/games/${id}`);
      const currentScore = result.data;
      setCurrentId(id);
      setInputName(currentScore.name);
      setInputGenre(currentScore.genre);
      setInputImg(currentScore.image_url);
      setInputSingle(currentScore.singlePlayer);
      setInputMulti(currentScore.multiplayer);
      setInputRelease(currentScore.platform);
      setInputPlatform(currentScore.release);
    };
    if (id) {
      fetchData();
    }
  }, [id]);

  return (
    <>
      <div className={user ? `MainContainerUser` : `MainContainer`}>
        <div className={user ? `SideContainerUser` : `SideContainer`}>
          {user ? <SideNavMenu /> : <></>}
          <div className="detailDivMargin">
            <div className="gamesTittle">Detail Game</div>
            <Container className="detailContainer">
              <Row>
                <Col>
                  <div className="detailDiv">
                    <img
                      alt="Logo game "
                      className="detailImg"
                      src={inputImg}
                    ></img>
                  </div>
                </Col>
                <Col>
                  <div className="detailDiv">
                    <Card.Body>
                      <Card.Title className="detailMargin">
                        Name : {inputName}
                      </Card.Title>
                      <Card.Title className="detailMargin">
                        Genre : {inputGenre}
                      </Card.Title>
                      <Card.Title className="detailMargin">
                        Platform : {inputPlatform}
                      </Card.Title>
                      <Card.Title className="detailMargin">
                        Singleplayer : {inputSingle === 1 ? "Yes" : "No"}
                      </Card.Title>
                      <Card.Title className="detailMargin">
                        Multiplayer : {inputMulti === 1 ? "Yes" : "No"}
                      </Card.Title>
                      <Card.Title className="detailMargin">
                        Release : {inputRelease}
                      </Card.Title>
                    </Card.Body>
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
        </div>
      </div>
    </>
  );
};
export default ScoreForm;
