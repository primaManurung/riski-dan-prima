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
import { useContext } from "react";
import { UserContext } from "../Auth/UserContext";
import SideNavMenu from "../Layout/Sidenav";

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
  const [user] = useContext(UserContext);
  const url = "https://super-bootcamp-backend.sanbersy.com";
  const [game, setGame] = useState([]);
  const [fetchTrigger, setFetchTrigger] = useState(true);
  const [search1, setSearch1] = useState("");
  const [sortedField, setSortedField] = useState("ASC");
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(`${url}/api/movies`);
      setGame(
        result.data.map((x) => {
          return {
            id: x.id,
            name: x.title,
            genre: x.genre,
            image: x.image_url,
            year: x.year,
            description: x.description,
            duration:x.duration,
            review: x.review,
            rating: x.rating,
          };
        })
      );
      setFetchTrigger(false);
    };
    if (fetchTrigger) {
      fetchData();
    }
  }, [fetchTrigger]);
  // handle change event of search input
  // Search Item by Name

  //addGame
  const addGame = () => {
    history.push("/movie/table/create");
  };

  //editGame
  const handleEdit = async (event) => {
    let idGame = Number(event.target.value);
    history.push(`/movie/table/${idGame}/edit`);
  };

  //deleteGame
  const handleDelete = (event) => {
    let idGame = parseInt(event.target.value);
    axios
      .delete(`${url}/api/movies/${idGame}`, {
        headers: { Authorization: "Bearer " + user.token },
      })
      .then(() => {
        setFetchTrigger(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const sorting = (col) => {
    if (sortedField === "ASC") {
      const sorted = [...game].sort((a, b) => (a[col] > b[col] ? 1 : -1));
      setSortedField("DSC");
      setGame(sorted);
    }
    if (sortedField === "DSC") {
      const sorted = [...game].sort((a, b) => (a[col] < b[col] ? 1 : -1));
      setSortedField("ASC");
      setGame(sorted);
    }
  };

  return (
    <>
      <div className={user ? `MainContainerUser` : `MainContainer`}>
        <div className={user ? `SideContainerUser` : `SideContainer`}>
          {user ? <SideNavMenu /> : <></>}
          <div>
            <div className="gamesTittle">
              Table Game{" "}
              <button className="AddGame" onClick={addGame}>
                Add Game
              </button>
            </div>

            <div className="GameContainer">
              <div className="tableContainer">
                <input
                  className="inputSearch"
                  type="text"
                  value={search1}
                  onChange={(e) => setSearch1(e.target.value.toLowerCase())}
                  placeholder="Search by Name or Genre...."
                ></input>
                <TableContainer component={Paper}>
                  <Table sx={{ Width: 700 }} aria-label="customized table">
                    <TableHead>
                      <TableRow>
                        <StyledTableCell className="tableTable">
                          Image
                        </StyledTableCell>
                        <StyledTableCell className="tableTable" align="left">
                          Name
                        </StyledTableCell>
                        <StyledTableCell className="tableTable" align="left">
                          Genre
                        </StyledTableCell>
                        <StyledTableCell className="tableTable" align="left">
                          Description
                        </StyledTableCell>
                        <StyledTableCell className="tableTable" align="left">
                          Duration
                        </StyledTableCell>
                        <StyledTableCell className="tableTable" align="left">
                          Release
                        </StyledTableCell>
                        <StyledTableCell className="tableTable" align="left">
                          Rating
                        </StyledTableCell>
                        <StyledTableCell className="tableTable" align="left">
                          Review
                        </StyledTableCell>
                        <StyledTableCell className="tableTable" align="left">
                          Action
                        </StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableHead>
                      <TableRow>
                        <StyledTableCell className="tableTable">
                        </StyledTableCell>
                        <StyledTableCell className="tableTable" align="left">
                          <button
                            className="buttonGames"
                            onClick={() => sorting("title")}
                          >
                            Sort
                          </button>
                        </StyledTableCell>
                        <StyledTableCell className="tableTable" align="left">
                          <button
                            className="buttonGames"
                            onClick={() => sorting("genre")}
                          >
                            Sort
                          </button>
                        </StyledTableCell>
                        <StyledTableCell className="tableTable" align="left">
                        </StyledTableCell>
                        <StyledTableCell className="tableTable" align="left">
                          <button
                            className="buttonGames"
                            onClick={() => sorting("duration")}
                          >
                            Sort
                          </button>
                        </StyledTableCell>
                        <StyledTableCell className="tableTable" align="left">
                          <button
                            className="buttonGames"
                            onClick={() => sorting("year")}
                          >
                            Sort
                          </button>
                        </StyledTableCell>
                        <StyledTableCell className="tableTable" align="left">
                        <button
                            className="buttonGames"
                            onClick={() => sorting("rating")}
                          >
                            Sort
                          </button>
                        </StyledTableCell>
                        <StyledTableCell className="tableTable" align="left">                          
                        </StyledTableCell>
                        <StyledTableCell className="tableTable" align="left">                          
                        </StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {game
                        .filter((asd) =>
                          asd.name?.toLowerCase().includes(search1) ||
                          asd.genre?.toLowerCase().includes(search1)
                        )
                        .map((item, index) => (
                          <StyledTableRow key={index}>
                            <StyledTableCell component="th" scope="row">
                              <img style={{"width":"50px"}}
                                className="imageTableMovie"
                                src={item.image}
                                alt="Game List"
                              ></img>
                            </StyledTableCell>
                            <StyledTableCell
                              className="tableCell"
                              align="right"
                            >
                              {item.name}
                            </StyledTableCell>
                            <StyledTableCell
                              className="tableCell"
                              align="right"
                            >
                              {item.genre}
                            </StyledTableCell>
                            <StyledTableCell
                              className="tableCell"
                              align="right"
                            >
                              {item.description}
                            </StyledTableCell>
                            <StyledTableCell
                              className="tableCell"
                              align="right"
                            >
                              {item.duration} menit
                            </StyledTableCell>
                            <StyledTableCell
                              className="tableCell"
                              align="right"
                            >
                              {item.year}
                            </StyledTableCell>
                            <StyledTableCell
                            style={{"width":"80px"}}
                              className="tableCell"
                              align="right"
                            >
                              {item.rating} / 10
                            </StyledTableCell>
                            <StyledTableCell
                              className="tableCell"
                              align="right"
                            >
                              {item.review}
                            </StyledTableCell>
                            
                            {user ? (
                              <StyledTableCell
                                className="tableCell"
                                align="right"
                              >
                                <span>
                                  <button
                                    className="buttonTableMovie"
                                    onClick={handleEdit}
                                    value={item.id}
                                  >
                                    Edit
                                  </button>
                                </span>
                                <span>
                                  <button
                                    className="buttonTableMovie"
                                    onClick={handleDelete}
                                    value={item.id}
                                  >
                                    Delete
                                  </button>
                                </span>
                              </StyledTableCell>
                            ) : (
                              <></>
                            )}
                          </StyledTableRow>
                        ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default MovieTable;
