import axios from "axios";
import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { UserContext } from "../Auth/UserContext";
import { useContext } from "react";
import SideNavMenu from "../Layout/Sidenav";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
const FormGame = () => {
  let history = useHistory();
  let { id } = useParams();
  const url = "https://super-bootcamp-backend.sanbersy.com";
  const [inputImg, setInputImg] = useState("");
  const [inputName, setInputName] = useState("");
  const [inputGenre, setInputGenre] = useState("");
  const [inputSingle, setInputSingle] = useState(0);
  const [inputSingle2, setInputSingle2] = useState(true);
  const [inputMulti2, setInputMulti2] = useState(true);
  const [inputMulti, setInputMulti] = useState(0);
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

  const getClick = (data) => {
    if (data === "Yes") {
      if (inputSingle2 === true) {
        console.log(data);
        setInputSingle(1);
      } else {
        console.log("No");
        setInputSingle(0);
      }
      setInputSingle2(!inputSingle2);
    }
  };
  const getClick2 = (data) => {
    if (data === "Yes") {
      if (inputMulti2 === true) {
        console.log(data);
        setInputMulti(1);
      } else {
        console.log("No");
        setInputMulti(0);
      }
      setInputMulti2(!inputMulti2);
    }
  };

  return (
    <>
      <div className={user ? `MainContainerUser` : `MainContainer`}>
        <div className={user ? `SideContainerUser` : `SideContainer`}>
          {user ? <SideNavMenu /> : <></>}
          <div className="textCenter">
            <div className="gamesTittle">Form Game</div>
            <div>
              <div className="inputfieldSingle">
                <input
                  required
                  className="input"
                  value={inputSingle}
                  type="number"
                  name="singlePlayer"
                  onChange={handleSingleChange}
                ></input>
              </div>
              <div className="inputfieldSingle">
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
                        value={inputImg}
                        onChange={handleImgChange}
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
                        name="name"
                        value={inputName}
                        onChange={handleNameChange}
                      ></input>
                    </td>
                  </tr>
                  <tr>
                    <td>Genre :</td>
                    <td>
                      {" "}
                      <input
                        required
                        type="text"
                        className="input"
                        name="genre"
                        value={inputGenre}
                        onChange={handleGenreChange}
                      ></input>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={2}>
                      SinglePlayer :{" "}
                      <span>{inputSingle === 1 ? "Yes" : "No"}</span>{" "}
                      <input
                        type="checkbox"
                        className="input"
                        name="singlePlayer"
                        value={inputSingle2}
                        onChange={() => getClick("Yes")}
                        // onChange={updateClick}
                      />
                      Centang Untuk Yes{" "}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={2}>
                      Multiplayer :{" "}
                      <span>{inputMulti === 1 ? "Yes" : "No"}</span>{" "}
                      <input
                        type="checkbox"
                        className="input"
                        name="singlePlayer"
                        value={inputMulti2}
                        onClick={() => getClick2("Yes")}
                        // onChange={updateClick}
                      />
                      Centang Untuk Yes
                    </td>
                  </tr>
                  <tr>
                    <td>Platform :</td>
                    <td>
                      <input
                        required
                        className="input"
                        value={inputPlatform}
                        name="singlePlayer"
                        onChange={handlePlatformChange}
                      ></input>
                    </td>
                  </tr>
                  <tr>
                    <td>Release :</td>
                    <td>
                      <input
                        required
                        className="input"
                        value={inputRelease}
                        name="singlePlayer"
                        onChange={handleReleaseChange}
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
      </div>
    </>
  );
};

export default FormGame;
