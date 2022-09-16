import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

function HomeGame() {
  let history = useHistory();
  const url = "https://super-bootcamp-backend.sanbersy.com";
  const [game, setGame] = useState([]);
  const [fetchTrigger, setFetchTrigger] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(`${url}/api/games`);
      setGame(
        result.data.map((x) => {
          return { id: x.id, name: x.name, genre: x.genre, img: x.image_url };
        })
      );
      setFetchTrigger(false);
    };
    if (fetchTrigger) {
      fetchData();
    }
  }, [fetchTrigger]);

  const handleDetail = async (event) => {
    let idGame = Number(event.target.value);
    history.push(`/game/${idGame}/detail`);
  };

  return (
    <>
      <div className="gamesTittle">
        Play <span>The Best</span> Game
      </div>
      <div className="cardContainer">
        {game.map((item, index) => {
          return (
            <div className="card" key={index}>
              <img src={item.img} alt="Avatar" />
              <div className="containerCard">
                <h6>
                  <b>{item.name}</b>
                </h6>
                <p>{item.genre}</p>
                <button
                  className="buttonGames"
                  onClick={handleDetail}
                  value={item.id}
                >
                  Detail Game
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default HomeGame;
