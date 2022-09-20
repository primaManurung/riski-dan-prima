import axios from "axios";
import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { UserContext } from "../Auth/UserContext";
import { useContext } from "react";
import SideNavMenu from "../Layout/Sidenav";
import form from "react-bootstrap/Table";

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
            <div className="gamesTittle">Movie Form</div>
            
              <form className="formTable">
                
                <div>
                  <div style={{"display":"flex"}}>
                    <label>Link Image :</label>
                    <div>
                      {" "}
                      <input
                        type="text"
                        required
                        className="input"
                        name="image_url"
                        value={image}
                        onChange={handleImage}
                      ></input>
                    </div>
                  </div>
                  <div>
                    <label>Name : </label>
                    <div>
                      <input
                        type="text"
                        required
                        className="input"
                        name="title"
                        value={name}
                        onChange={handleTitle}
                      ></input>
                    </div>
                  </div>
                  <div>
                    <label>Genre : </label>
                    <div>
                      {" "}
                      <input
                        required
                        type="text"
                        className="input"
                        name="genre"
                        value={genre}
                        onChange={handleGenre}
                      ></input>
                    </div>
                  </div>
                 
                  <div>
                    <label>Description :</label>
                    <div>
                      <textarea style={{"width":"115%","height":"200px"}}
                        required
                        width="100px"
                        className="input"
                        value={description}
                        name="description"
                        onChange={handleDescription}
                      ></textarea>
                    </div>
                  </div>
                  <div>
                    <label>Duration :</label>
                    <div>
                      <input
                        required
                        min={60}
                        max={240}
                        type="number"
                        className="input"
                        value={duration}
                        name="duration"
                        onChange={handleDuration}
                      ></input>
                    </div>
                  </div>
                  <div>
                    <label>Release :</label>
                    <div>
                      <input
                        required
                        min={1900}
                        max={2022}
                        type="number"
                        className="input"
                        value={release}
                        name="year"
                        onChange={handleRelease}
                      ></input>
                    </div>
                  </div>
                  <div>
                    <label>Rating :</label>
                    <div>
                      <input
                        required
                        max={10}
                        type="number"
                        className="input"
                        value={rating}
                        name="rating"
                        onChange={handleRating}
                      ></input>
                    </div>
                  </div>
                  <div>
                    <label>Review :</label>
                    <div>
                      <textarea style={{"width":"115%","height":"100px"}}
                        required
                        className="input"
                        value={review}
                        name="review"
                        onChange={handleReview}
                      ></textarea>
                    </div>
                  </div>
                </div>
              </form>
              <button
                className="buttonForm"
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
