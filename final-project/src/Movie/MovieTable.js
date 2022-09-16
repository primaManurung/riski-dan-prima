import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));
  
  const MovieTable = () => {
    let history = useHistory();
    const url = "https://super-bootcamp-backend.sanbersy.com";
    const [movie, setMovie] = useState([]);
    const [fetchTrigger, setFetchTrigger] = useState(true);
  
    useEffect(() => {
      const fetchData = async () => {
        const result = await axios.get(`${url}/api/movies`);
        setMovie(
          result.data.map((x) => {
            return {
              id: x.id,
              judul: x.title,
              description: x.description,
              img: x.image_url,
              rating: x.rating,
              duration: x.duration,
              genre: x.genre,
              release: x.year,
            };
          })
        );
        setFetchTrigger(false);
      };
      if (fetchTrigger) {
        fetchData();
      }
    }, [fetchTrigger]);

  //   const handleDelete = (event)=>{
  //     let index = Number(event.target.value)
  //     if (currentIndex !== -1){
  //         //clear form
  //         // setCurrentIndex(-1)
  //         // setShowForm(false)
  //     }

  //     // filter return data without equal value
  //     let newbuah = buah.filter((item, itemIndex)=>{
  //         return index !== itemIndex
  //     })

  //     setBuah(newbuah)
  // }

  
    return (
      <div className="tableContainer">
        <TableContainer component={Paper}>
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Image</StyledTableCell>
                <StyledTableCell align="left">Film</StyledTableCell>
                <StyledTableCell align="left">Description</StyledTableCell>
                <StyledTableCell align="left">Genre</StyledTableCell>
                <StyledTableCell align="left">Duration</StyledTableCell>
                <StyledTableCell align="left">Rating</StyledTableCell>
                <StyledTableCell align="left">Release</StyledTableCell>
                <StyledTableCell align="left">Action</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {movie.map((item) => (
                <StyledTableRow key={item}>
                  <StyledTableCell component="th" scope="row">
                    <img className="imgMovieTable" src={item.img}></img>
                  </StyledTableCell>
                  <StyledTableCell className="tableCell" align="right">
                    {item.judul}
                  </StyledTableCell>
                  <StyledTableCell className="tableCell" align="right">
                    {item.description}
                  </StyledTableCell>
                  <StyledTableCell className="tableCell" align="right">
                    {item.genre}
                  </StyledTableCell>
                  <StyledTableCell className="tableCell" align="right">
                    {item.duration+" menit"}
                  </StyledTableCell>
                  <StyledTableCell className="tableCell" align="right">
                    {item.rating+"/10"}
                  </StyledTableCell>
                  <StyledTableCell className="tableCell" align="right">
                    {item.release}
                  </StyledTableCell>
                  <StyledTableCell className="tableCell" align="right">
                    <span>
                      <button className="tombolEditTableMovie">Edit</button>
                    </span>
                    {/* <span>
                      <button className="tombolTableMovie" onClick={aksiDelete}>Delete</button>
                    </span> */}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  };
  export default MovieTable;
  