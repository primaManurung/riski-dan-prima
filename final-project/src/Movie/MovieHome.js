import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

function MovieHome() {
  let history = useHistory();
  const url = "https://super-bootcamp-backend.sanbersy.com";
  const [movie, setMovie] = useState([]);
  const [fetchTrigger, setFetchTrigger] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(`${url}/api/movies`);
      setMovie(
        result.data.map((x) => {
          return { id: x.id, name: x.title, genre: x.genre, img: x.image_url };
        })
      );
      setFetchTrigger(false);
    };
    if (fetchTrigger) {
      fetchData();
    }
  }, [fetchTrigger]);

  const handleDetail = async (event) => {
    let idMovie = Number(event.target.value);
    history.push(`/movie/${idMovie}/detail`);
  };

  return (
    <>
      <div className="gamesTittle">
        Movie Collection
      </div>
      <div className="cardMovieContainer">
        {movie.map((item, index) => {
          return (
            <div className="movieCard" key={index}>
              <img className="imgMovie" src={item.img} />
              <div className="containerCard">
                <h6>
                  <b>{item.name}</b>
                </h6>
                <p>{item.genre}</p>
                <button
                  className="buttonMovie"
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

export default MovieHome;
