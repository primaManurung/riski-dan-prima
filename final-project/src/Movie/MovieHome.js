import { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import SideNavMenu from "../Layout/Sidenav";
import { UserContext } from "../Auth/UserContext";

function MovieHome() {
  let history = useHistory();
  const url = "https://super-bootcamp-backend.sanbersy.com";
  const [movie, setMovie] = useState([]);
  const [fetchTrigger, setFetchTrigger] = useState(true);
  const [user, setuser] = useContext(UserContext)

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(`${url}/api/movies`);
      setMovie(
        result.data.map((x) => {
          return { id: x.id, title: x.title, genre: x.genre ,description: x.description, duration: x.duration , release: x.year, rating: x.rating, review: x.review,img: x.image_url };
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
      {" "}
      <div className={user ? `MainContainerUser` : `MainContainer`}>
        <div className={user ? `SideContainerUser` : `SideContainer`}>
          {user ? <SideNavMenu /> : <></>}
          <div>
            <div className="gamesTittle">
              Movie Collection
            </div>
            <div className={user ? `CardContainerUser` : `ccardContainer`}>
              {movie.map((item, index) => {
                return (
                  <div className={user ? ` cardMovieUser` : `movieCard`} key={index}>
                    <img className="gambar" src={item.img} alt="Avatar" />
                    <div className="cardMovieContainer">
                    <h6>
                        <b style={{"color":"white"}}>{item.title}</b>
                      </h6>
                      <p>{item.genre}</p>                      
                      <p>{item.release}</p>                      
                      <button
                        className="buttonMovie"
                        onClick={handleDetail}
                        value={item.id}
                      >
                        Movie Detail
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MovieHome;
