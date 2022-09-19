// import * as React from "react";
// import { styled } from "@mui/material/styles";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell, { tableCellClasses } from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import Paper from "@mui/material/Paper";
// import { useState, useEffect } from "react";
// import { useHistory } from "react-router-dom";
// import axios from "axios";
// // import Router from "router";
// // import MovieForm from "./MovieForm";

// // const StyledTableCell = styled(TableCell)(({ theme }) => ({
// //     [`&.${tableCellClasses.head}`]: {
// //       backgroundColor: theme.palette.common.black,
// //       color: theme.palette.common.white,
// //     },
// //     [`&.${tableCellClasses.body}`]: {
// //       fontSize: 14,
// //     },
// //   }));

// //   const StyledTableRow = styled(TableRow)(({ theme }) => ({
// //     "&:nth-of-type(odd)": {
// //       backgroundColor: theme.palette.action.hover,
// //     },
// //     // hide last border
// //     "&:last-child td, &:last-child th": {
// //       border: 0,
// //     },
// //   }));

//     const handleEdit = async (event)=>{
//       let idScore = Number(event.target.value)

//       history.push(`/movie/${idScore}/edit`)

//   }

//   const addNewMovie = ()=>{
//     history.push("/movie/create")
// }

//     const handleDelete = (event)=>{
//       let idMovie = parseInt(event.target.value)
//       axios.delete(`${url}/api/movies/${idMovie}`).then(()=>{
//           setFetchTrigger(true)
//       }).catch((err)=>{
//           console.log(err)
//       })
//   }

//     return (
//       <div className="tableContainer">
//         <button className="addMovie"onClick={addNewMovie}>add Movie Collection</button>
//         <TableContainer component={Paper}>
//           <Table aria-label="customized table">
//             <TableHead>
//               <TableRow>
//                 <StyledTableCell>Image</StyledTableCell>
//                 <StyledTableCell align="left">Film</StyledTableCell>
//                 <StyledTableCell align="left">Description</StyledTableCell>
//                 <StyledTableCell align="left">Genre</StyledTableCell>
//                 <StyledTableCell align="left">Duration</StyledTableCell>
//                 <StyledTableCell align="left">Rating</StyledTableCell>
//                 <StyledTableCell align="left">Release</StyledTableCell>
//                 <StyledTableCell align="left">Action</StyledTableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {movie.map((item) => (
//                 <StyledTableRow key={item}>
//                   <StyledTableCell component="th" scope="row">
//                     <img className="imgMovieTable" src={item.img}></img>
//                   </StyledTableCell>
//                   <StyledTableCell className="tableCell" align="right">
//                     {item.judul}
//                   </StyledTableCell>
//                   <StyledTableCell className="tableCell" align="right">
//                     {item.description}
//                   </StyledTableCell>
//                   <StyledTableCell className="tableCell" align="right">
//                     {item.genre}
//                   </StyledTableCell>
//                   <StyledTableCell className="tableCell" align="right">
//                     {item.duration+" menit"}
//                   </StyledTableCell>
//                   <StyledTableCell className="tableCell" align="right">
//                     {item.rating+"/10"}
//                   </StyledTableCell>
//                   <StyledTableCell className="tableCell" align="right">
//                     {item.release}
//                   </StyledTableCell>
//                   <StyledTableCell className="tableCell" align="right">
//                     <span>
//                       <button className="tombolEditTableMovie"onClick={handleEdit}>Edit</button>
//                     </span>
//                     <span>
//                       <button className="tombolTableMovie"onClick={handleDelete}>Delete</button>
//                     </span>
//                   </StyledTableCell>
//                 </StyledTableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>

//       </div>
//     );
//   };
//   export default MovieTable;
