import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../Auth/UserContext";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SideNavMenu from "../Layout/Sidenav";
import Card from "react-bootstrap/Card";

const MovieDetail = () => {
  let history = useHistory();
  let { id } = useParams();
  const url = "https://super-bootcamp-backend.sanbersy.com";
  const [user, setUser] = useContext(UserContext);
  const [name, setName] = useState("");
  const [genre, setGenre] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [release, setRelease] = useState("");
  const [rating, setRating] = useState("");
  const [review, setReview] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(`${url}/api/movies/${id}`);
      const currentId = result.data;
      setCurrentIndex(id)
      setName(currentId.name)
      setDescription(currentId.description)
      setGenre(currentId.genre)
      setDuration(currentId.duration)
      setRelease(currentId.year)
      setRating(currentId.rating)
      setReview(currentId.review)
      setImage(currentId.image_url)
    }
    if(id){
      fetchData()
    }
  },[id])

  return(
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
                      src={image}
                    ></img>
                  </div>
                </Col>
                <Col>
                  <div className="detailDiv">
                    <Card.Body>
                      <Card.Title className="detailMargin">
                        Name : {name}
                      </Card.Title>
                      <Card.Title className="detailMargin">
                        Genre : {genre}
                      </Card.Title>
                      <Card.Title className="detailMargin">
                        Description : {description}
                      </Card.Title>
                      <Card.Title className="detailMargin">
                        Duration : {duration} menit
                      </Card.Title>
                      <Card.Title className="detailMargin">
                        Rating : {rating} / 10
                      </Card.Title>
                      <Card.Title className="detailMargin">
                        Release : {release}
                      </Card.Title>
                      <Card.Title className="detailMargin">
                        Review : {review}
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
  )

};
export default MovieDetail;
