import axios from "axios";
import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { UserContext } from "../Auth/UserContext";
import { useContext } from "react";
import SideNavMenu from "../Layout/Sidenav";
import Table from "react-bootstrap/Table";

const MovieForm = () => {
  let history = useHistory();
  let { id } = useParams();
  const url = "https://super-bootcamp-backend.sanbersy.com";
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [genre, setGenre] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [rating, setRating] = useState("");
  const [release, setRelease] = useState("");
  const [review,setReview] = useState("");
  const [currentId, setCurrentId] = useState(null);
  const [user] = useContext(UserContext);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(`${url}/api/movies/${id}`);
      const currentMovie = result.data;
      setCurrentId(id);
      setImage(currentMovie.image_url);
      setName(currentMovie.title);
      setGenre(currentMovie.genre);
      setDescription(currentMovie.description);
      setDuration(currentMovie.duration);
      setRating(currentMovie.rating);
      setRelease(currentMovie.year);
      setReview(currentMovie.review);
    };
    if (id) {
      fetchData();
    }
  }, [id]);

  //handleChange
  const handleImage = (event) => {
    let inputValue = event.target.value;
    setImage(inputValue);
  };
  const handleTitle = (event) => {
    let inputValue = event.target.value;
    setName(inputValue);
  };
  const handleGenre = (event) => {
    let inputValue = event.target.value;
    setGenre(inputValue);
  };
  const handleDescription = (event) => {
    let inputValue = event.target.value;
    setDescription(inputValue);
  };

  const handleDuration = (event) => {
    let inputValue = event.target.value;
    setDuration(inputValue);
  };
  const handleRating = (event) => {
    let inputValue = event.target.value;
    setRating(inputValue);
  };
  const handleRelease = (event) => {
    let inputValue = event.target.value;
    setRelease(inputValue);
  };
  const handleReview = (event) => {
    let inputValue = event.target.value;
    setReview(inputValue);
  };


  //submit
  const handleSubmit = (event) => {
    event.preventDefault();
    if (currentId === null) {
      axios
        .post(
          `${url}/api/movies`,
          {
            image_url: image,
            title: name,
            genre: genre,
            description: description,
            duration: duration,
            rating: rating,
            year: release,
            review: review
          },
          { headers: { Authorization: "Bearer " + user.token } }
        )
        .then((res) => {
          history.push("/movie/table");
        });
    } else {
      axios
        .put(
          `${url}/api/movies/${currentId}`,
          {
            image_url: image,
            title: name,
            genre: genre,
            description: description,
            duration: duration,
            rating: rating,
            year: release,
            review: review
          },
          { headers: { Authorization: "Bearer " + user.token } }
        )
        .then(() => {
          history.push("/movie/table");
        });
    }
    setCurrentId(null);
    setImage("");
    setName("");
    setGenre("");
    setDescription("");
    setDuration("");
    setRating("");
    setRelease("");
    setReview("");
  };

  return (
    <>
      <div className={user ? `MainContainerUser` : `MainContainer`}>
        <div className={user ? `SideContainerUser` : `SideContainer`}>
          {user ? <SideNavMenu /> : <></>}
          <div className="textCenter">
            <div className="gamesTittle">Form Game</div>
            
              <Table className="formTable">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Form Game</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Link Image :</td>
                    <td>
                      {" "}
                      <input
                        type="text"
                        required
                        className="input"
                        name="image_url"
                        value={image}
                        onChange={handleImage}
                      ></input>
                    </td>
                  </tr>
                  <tr>
                    <td>Name : </td>
                    <td>
                      <input
                        type="text"
                        required
                        className="input"
                        name="title"
                        value={name}
                        onChange={handleTitle}
                      ></input>
                    </td>
                  </tr>
                  <tr>
                    <td>Genre : </td>
                    <td>
                      {" "}
                      <input
                        required
                        type="text"
                        className="input"
                        name="genre"
                        value={genre}
                        onChange={handleGenre}
                      ></input>
                    </td>
                  </tr>
                 
                  <tr>
                    <td>Description :</td>
                    <td>
                      <input
                        required
                        className="input"
                        value={description}
                        name="description"
                        onChange={handleDescription}
                      ></input>
                    </td>
                  </tr>
                  <tr>
                    <td>Duration :</td>
                    <td>
                      <input
                        required
                        className="input"
                        value={duration}
                        name="duration"
                        onChange={handleDuration}
                      ></input>
                    </td>
                  </tr>
                  <tr>
                    <td>Release :</td>
                    <td>
                      <input
                        required
                        className="input"
                        value={release}
                        name="year"
                        onChange={handleRelease}
                      ></input>
                    </td>
                  </tr>
                  <tr>
                    <td>Release :</td>
                    <td>
                      <input
                        required
                        className="input"
                        value={rating}
                        name="rating"
                        onChange={handleRating}
                      ></input>
                    </td>
                  </tr>
                  <tr>
                    <td>Release :</td>
                    <td>
                      <input
                        required
                        className="input"
                        value={review}
                        name="review"
                        onChange={handleReview}
                      ></input>
                    </td>
                  </tr>
                </tbody>
              </Table>
              <button
                className="btnTableGame"
                type="submit"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      
    </>
  );
};
export default MovieForm;
