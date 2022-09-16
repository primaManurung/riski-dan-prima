import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";

const DetailGame = () => {
  let history = useHistory();
  let { id } = useParams();
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
  return (
    <>
      {game.map((item, index) => {
        return <h1 key={index}>{item.name}</h1>;
      })}
    </>
  );
};
export default DetailGame;
