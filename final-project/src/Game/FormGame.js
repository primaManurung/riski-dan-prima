import axios from "axios";
import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { UserContext } from "../Auth/UserContext";
import { useContext } from "react";

const FormGame = () => {
  let history = useHistory();
  let { id } = useParams();
  const url = "https://super-bootcamp-backend.sanbersy.com";
  const [inputImg, setInputImg] = useState("");
  const [inputName, setInputName] = useState("");
  const [inputGenre, setInputGenre] = useState("");
  const [inputSingle, setInputSingle] = useState();
  const [inputMulti, setInputMulti] = useState();
  const [inputPlatform, setInputPlatform] = useState("");
  const [inputRelease, setInputRelease] = useState("");
  const [currentId, setCurrentId] = useState(null);
  const [user] = useContext(UserContext);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(`${url}/api/games/${id}`);
      const currentGame = result.data;
      setCurrentId(id);
      setInputImg(currentGame.image_url);
      setInputName(currentGame.name);
      setInputGenre(currentGame.genre);
      setInputSingle(currentGame.singlePlayer);
      setInputMulti(currentGame.multiplayer);
      setInputPlatform(currentGame.platform);
      setInputRelease(currentGame.release);
    };
    if (id) {
      fetchData();
    }
  }, [id]);

  //handleChange
  const handleImgChange = (event) => {
    let inputValue = event.target.value;
    setInputImg(inputValue);
  };
  const handleNameChange = (event) => {
    let inputValue = event.target.value;
    setInputName(inputValue);
  };
  const handleGenreChange = (event) => {
    let inputValue = event.target.value;
    setInputGenre(inputValue);
  };
  const handleSingleChange = (event) => {
    let inputValue = event.target.value;
    setInputSingle(inputValue);
  };

  const handleMultiChange = (event) => {
    let inputValue = event.target.value;
    setInputMulti(inputValue);
  };
  const handlePlatformChange = (event) => {
    let inputValue = event.target.value;
    setInputPlatform(inputValue);
  };
  const handleReleaseChange = (event) => {
    let inputValue = event.target.value;
    setInputRelease(inputValue);
  };

  //submit
  const handleSubmit = (event) => {
    event.preventDefault();
    if (currentId === null) {
      axios
        .post(
          `${url}/api/games`,
          {
            image_url: inputImg,
            name: inputName,
            genre: inputGenre,
            singlePlayer: inputSingle,
            multiplayer: inputMulti,
            platform: inputPlatform,
            release: inputRelease,
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
            image_url: inputImg,
            name: inputName,
            genre: inputGenre,
            singlePlayer: inputSingle,
            multiplayer: inputMulti,
            platform: inputPlatform,
            release: inputRelease,
          },
          { headers: { Authorization: "Bearer " + user.token } }
        )
        .then(() => {
          history.push("/game/table");
        });
    }
    setCurrentId(null);
    setInputImg("");
    setInputName("");
    setInputGenre("");
    setInputSingle();
    setInputMulti();
    setInputPlatform("");
    setInputRelease("");
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
                  value={inputImg}
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
                  value={inputName}
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
                  value={inputGenre}
                  onChange={handleGenreChange}
                ></input>
              </div>{" "}
              <div className="inputfield">
                <label>Single Player </label>
                <input
                  required
                  className="input"
                  value={inputSingle}
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
                  value={inputMulti}
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
                  value={inputPlatform}
                  name="singlePlayer"
                  onChange={handlePlatformChange}
                ></input>
              </div>
              <div className="inputfield">
                <label>Release</label>
                <input
                  required
                  className="input"
                  value={inputRelease}
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
export default FormGame;
