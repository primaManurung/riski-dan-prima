import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";

const MovieDetail = () => {
  let history = useHistory();
  let { id } = useParams();
  const url = "https://super-bootcamp-backend.sanbersy.com";
  const [movie, setMovie] = useState([]);
  // const [fetchTrigger, setFetchTrigger] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       const result = await axios.get(`${url}/api/movies/${id}`);
//       setMovie(
//         result.data.map((x) => {
//           return <h1>{ id= x.id, title= x.title, description= x.description, img= x.image_url }</h1>;
//         })
//       );
      
//   //     setFetchTrigger(false);
//   //   };
//   //   if (fetchTrigger) {
//   //     fetchData();
//   //   }
//   // }, [fetchTrigger]);
//   // return (
//   //   <>
//   //     {movie.map((item, index) => {
//   //       return <h1 key={index}>{item.name}</h1>;
//   //     })}
//     // </>
//   // );
};
export default MovieDetail;
