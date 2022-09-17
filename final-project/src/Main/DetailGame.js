import { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";

const DetailGame = () => {
  let history = useHistory();
  let { id } = useParams();
  let initalForm = {
    name: "",
    genre: "",
    release: 0,
  };
  const url = "https://super-bootcamp-backend.sanbersy.com";
  const [input, setInput] = useState(initalForm); // state
  const [currentId, setCurrentId] = useState(null); // state for currentId (for handleEdit function)

  const fetchData = async () => {
    let result = await axios.get(`${url}/api/games/${id}`);
    let { name, genre, release } = result.data;

    setInput({ name, genre, release });
    setCurrentId(id);
  };

  useEffect(() => {
    if (id) {
      fetchData();
    }
  }, [id]);

  return (
    <>
      <div>
        <h1>ANJENGGGGGG</h1>
        {/* {input
          .filter((item) => item.id === id)
          .map((item, index) => (
            <div key={index}>
              <h1>{item.name}</h1>
            </div>
          ))} */}
        {/* {game
          .filter((item) => item.id === id)
          .map((item, index) => {
            <div key={index}>
              <h1>{item.name}</h1>
              <h1>{item.genre}</h1>
            </div>;
          })} */}
      </div>
    </>
  );
};
export default DetailGame;
