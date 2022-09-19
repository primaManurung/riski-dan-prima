import axios from "axios";
import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { UserContext } from "../Auth/UserContext";
import { useContext } from "react";

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
  const [currentId, setCurrentId] = useState(null);
  const [user] = useContext(UserContext);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(`${url}/api/movies/${id}`);
      const currentGame = result.data;
      setCurrentId(id);
      setImage(currentGame.image_url);
      setInputName(currentGame.name);
      setGenre(currentGame.genre);
      setDescription(currentGame.singlePlayer);
      setDuration(currentGame.multiplayer);
      setRating(currentGame.platform);
      setRelease(currentGame.release);
    };
    if (id) {
      fetchData();
    }
  }, [id]);

  //handleChange
  const handleImgChange = (event) => {
    let inputValue = event.target.value;
    setImage(inputValue);
  };
  const handleNameChange = (event) => {
    let inputValue = event.target.value;
    setInputName(inputValue);
  };
  const handleGenreChange = (event) => {
    let inputValue = event.target.value;
    setGenre(inputValue);
  };
  const handleSingleChange = (event) => {
    let inputValue = event.target.value;
    setDescription(inputValue);
  };

  const handleMultiChange = (event) => {
    let inputValue = event.target.value;
    setDuration(inputValue);
  };
  const handlePlatformChange = (event) => {
    let inputValue = event.target.value;
    setRating(inputValue);
  };
  const handleReleaseChange = (event) => {
    let inputValue = event.target.value;
    setRelease(inputValue);
  };

  //submit
  const handleSubmit = (event) => {
    event.preventDefault();
    if (currentId === null) {
      axios
        .post(
          `${url}/api/games`,
          {
            image_url: image,
            name: name,
            genre: genre,
            singlePlayer: description,
            multiplayer: duration,
            platform: rating,
            release: release,
          },
          { headers: { Authorization: "Bearer " + user.token } }
        )
        .then((res) => {
          history.push("/game/table");
        });
    } else {
      axios
        .put(
          `${url}/api/games/${currentId}`,
          {
            image_url: image,
            name: name,
            genre: genre,
            singlePlayer: description,
            multiplayer: duration,
            platform: rating,
            release: release,
          },
          { headers: { Authorization: "Bearer " + user.token } }
        )
        .then(() => {
          history.push("/movie/table");
        });
    }
    setCurrentId(null);
    setImage("");
    setInputName("");
    setGenre("");
    setDescription();
    setDuration();
    setRating("");
    setRelease("");
  };

  return (
    <>
      <div className="MainContainer">
        <div className="container">
          <h1>Form Game </h1>
          <div className="wrapper">
            <form className="form" onSubmit={handleSubmit}>
              <div className="inputfield">
                <label>Img : </label>
                <input
                  type="text"
                  required
                  className="input"
                  name="image_url"
                  value={image}
                  onChange={handleImgChange}
                ></input>
              </div>
              <div className="inputfield">
                <label>Name : </label>
                <input
                  type="text"
                  required
                  className="input"
                  name="name"
                  value={name}
                  onChange={handleNameChange}
                ></input>
              </div>
              <div className="inputfield">
                <label>Genre</label>
                <input
                  required
                  type="text"
                  className="input"
                  name="genre"
                  value={genre}
                  onChange={handleGenreChange}
                ></input>
              </div>{" "}
              <div className="inputfield">
                <label>Single Player </label>
                <input
                  required
                  className="input"
                  value={description}
                  name="singlePlayer"
                  type="number"
                  onChange={handleSingleChange}
                ></input>
              </div>{" "}
              <div className="inputfield">
                <label>Multi Player </label>
                <input
                  required
                  className="input"
                  value={duration}
                  type="number"
                  name="multiplayer"
                  onChange={handleMultiChange}
                ></input>
              </div>
              <div className="inputfield">
                <label>Platform </label>
                <input
                  required
                  className="input"
                  value={rating}
                  name="singlePlayer"
                  onChange={handlePlatformChange}
                ></input>
              </div>
              <div className="inputfield">
                <label>Release</label>
                <input
                  required
                  className="input"
                  value={release}
                  name="singlePlayer"
                  onChange={handleReleaseChange}
                ></input>
              </div>
              <div className="inputfield">
                <button className="btn" type="submit">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
export default MovieForm;
