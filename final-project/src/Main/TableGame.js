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

const TableGame = () => {
  let history = useHistory();
  const url = "https://super-bootcamp-backend.sanbersy.com";
  const [game, setGame] = useState([]);
  const [fetchTrigger, setFetchTrigger] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(`${url}/api/games`);
      setGame(
        result.data.map((x) => {
          return {
            id: x.id,
            name: x.name,
            genre: x.genre,
            img: x.image_url,
            single: x.singlePlayer,
            multi: x.multiplayer,
            platform: x.platform,
            release: x.release,
          };
        })
      );
      setFetchTrigger(false);
    };
    if (fetchTrigger) {
      fetchData();
    }
  }, [fetchTrigger]);

  return (
    <div className="tableContainer">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Image</StyledTableCell>
              <StyledTableCell align="left">Name</StyledTableCell>
              <StyledTableCell align="left">Genre</StyledTableCell>
              <StyledTableCell align="left">Single Player</StyledTableCell>
              <StyledTableCell align="left">Multi Player</StyledTableCell>
              <StyledTableCell align="left">Platform</StyledTableCell>
              <StyledTableCell align="left">Release</StyledTableCell>
              <StyledTableCell align="left">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {game.map((item) => (
              <StyledTableRow key={item}>
                <StyledTableCell component="th" scope="row">
                  <img className="imgTable" src={item.img}></img>
                </StyledTableCell>
                <StyledTableCell className="tableCell" align="right">
                  {item.name}
                </StyledTableCell>
                <StyledTableCell className="tableCell" align="right">
                  {item.genre}
                </StyledTableCell>
                <StyledTableCell className="tableCell" align="right">
                  {item.single}
                </StyledTableCell>
                <StyledTableCell className="tableCell" align="right">
                  {item.multi}
                </StyledTableCell>
                <StyledTableCell className="tableCell" align="right">
                  {item.platform}
                </StyledTableCell>
                <StyledTableCell className="tableCell" align="right">
                  {item.release}
                </StyledTableCell>
                <StyledTableCell className="tableCell" align="right">
                  <span>
                    <button className="btnTableGame">Edit</button>
                  </span>
                  <span>
                    <button className="btnTableGame">Delete</button>
                  </span>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
export default TableGame;
