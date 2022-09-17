// import TableGame from "./TableGame";
// import { useState, useEffect } from "react";
// import axios from "axios";
// import Table from "./Table";

// function ButtonSearch() {
//   const [query, setQuery] = useState("");
//   const [data, setGame] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       const res = await axios.get(
//         `https://super-bootcamp-backend.sanbersy.com/api/games?q=${query}`
//       );
//       setGame(res.data);
//     };
//     if (query.length === 0 || query.length > 2) fetchData();
//   }, [query]);
//   return (
//     <div className="app">
//       <input
//         className="search"
//         placeholder="Search..."
//         onChange={(e) => setQuery(e.target.value.toLowerCase())}
//       />
//       {<Table data={data} />}
//     </div>
//   );
// }

// export default ButtonSearch;
