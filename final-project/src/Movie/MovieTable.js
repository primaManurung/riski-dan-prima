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
import { Container } from "react-bootstrap";

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
  const [movie, setGame] = useState([]);
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
            duration: x.duration,
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
  const addMovie = () => {
    history.push("/movie/table/create");
  };

  //editGame
  const handleEdit = async (event) => {
    let idMovie = Number(event.target.value);
    history.push(`/movie/table/${idMovie}/edit`);
  };

  //deleteGame
  const handleDelete = (event) => {
    let idMovie = parseInt(event.target.value);
    axios
      .delete(`${url}/api/movies/${idMovie}`, {
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
      const sorted = [...movie].sort((a, b) => (a[col] > b[col] ? 1 : -1));
      setSortedField("DSC");
      setGame(sorted);
    }
    if (sortedField === "DSC") {
      const sorted = [...movie].sort((a, b) => (a[col] < b[col] ? 1 : -1));
      setSortedField("ASC");
      setGame(sorted);
    }
  };

  const handleGenre = (event) => {
    const getFilterGame = event.target.value.toLowerCase();
    // if (getFilterGame == "--select genre--") {
    //   window.location.reload();
    // } else {
    const filtered = [...movie].filter((item) => {
      return item.genre.toLowerCase() === getFilterGame;
    });
    console.log(filtered);
    setGame(filtered);
    // }
  };

  const handleRelease = (event) => {
    const getFilterGame = event.target.value.toLowerCase();
    // if (getFilterGame == "--select release--") {
    //   window.location.reload();
    // } else {
    const filtered = [...movie].filter((item) => {
      return item.year.toLowerCase() === getFilterGame;
    });
    console.log(filtered);
    // alert(filtered);
    setGame(filtered);
    // setSearch1(getFilterGame);
    // event.preventDefault();
    // console.log(search1);
    // }
  };

  const handleRating = (event) => {
    const getFilterGame = event.target.value.toLowerCase();

    const filtered = [...movie].filter((item) => {
      return item.rating.toLowerCase() === getFilterGame;
    });
    console.log(filtered);
    // alert(filtered);
    setGame(filtered);
    // if (getFilterGame == "--select platform--") {
    //   window.location.reload();
    // }
  };
  const btnReset = () => {
    return window.location.reload();
  };


  return (
    <>
      <div className={user ? `MainContainerUser` : `MainContainer`}>
        <div className={user ? `SideContainerUser` : `SideContainer`}>
          {user ? <SideNavMenu /> : <></>}
          <div>
            <div className="gamesTittle">
              Table Movie           
            </div>
            <div>
            <Container className="content contentSelect">
                <div className="row">
                  <div className="col-sm-12">
                    <div style={{"alignItems":"center"}} className="row mb-3">
                      <div className="form-group col-md-3">
                        <h5 className="mb-2">Genre</h5>
                        <select
                          className="form-control"
                          onChange={(e) => handleGenre(e)}
                        >
                          <option>--Select--</option>
                          {movie.map((item) => (
                            <option key={item.id} value={item.genre}>
                              {" "}
                              {item.genre}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="form-group col-md-3">
                        <h5 className="mb-2">Rating</h5>
                        <select
                          className="form-control"
                          onChange={(e) => handleRelease(e)}
                        >
                          <option>--Select--</option>
                          {movie.map((item) => (
                            <option key={item.id} value={item.year}>
                              {item.year}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="form-group col-md-3">
                        <h5 className="mb-2">Rating</h5>
                        <select
                          className="form-control"
                          onChange={(e) => handleRating(e)}
                        >
                          <option>--Select--</option>
                          {movie.map((item) => (
                            <option key={item.id} value={item.rating}>
                              {item.rating}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="form-group col-md-3">
                        <button style={{"width":"100px"}} className="btnReset" onClick={btnReset}>
                          Reset
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </Container>
            </div>
            <div className="GameContainer">
              <div className="tableContainer">
                <div>
                <input
                  className="inputSearch"
                  type="text"
                  value={search1}
                  onChange={(e) => setSearch1(e.target.value.toLowerCase())}
                  placeholder="Search by Name or Genre...."
                ></input>
                </div>
                <TableContainer className="tableGame" component={Paper}>
                  <Table sx={{ Width: 700 }}  stickyHeader
                    aria-label="sticky table" >
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
                    <TableBody>
                      <TableRow>
                        <StyledTableCell className="tableTable"></StyledTableCell>
                        <StyledTableCell className="tableTable" align="left">
                          <button
                            className="buttonMovie"
                            onClick={() => sorting("title")}
                          >
                            Sort
                          </button>
                        </StyledTableCell>
                        <StyledTableCell className="tableTable" align="left">
                          <button
                            className="buttonMovie"
                            onClick={() => sorting("genre")}
                          >
                            Sort
                          </button>
                        </StyledTableCell>
                        <StyledTableCell
                          className="tableTable"
                          align="left"
                        ></StyledTableCell>
                        <StyledTableCell className="tableTable" align="left">
                          <button
                            className="buttonMovie"
                            onClick={() => sorting("duration")}
                          >
                            Sort
                          </button>
                        </StyledTableCell>
                        <StyledTableCell className="tableTable" align="left">
                          <button
                            className="buttonMovie"
                            onClick={() => sorting("year")}
                          >
                            Sort
                          </button>
                        </StyledTableCell>
                        <StyledTableCell className="tableTable" align="left">
                          <button
                            className="buttonMovie"
                            onClick={() => sorting("rating")}
                          >
                            Sort
                          </button>
                        </StyledTableCell>
                        <StyledTableCell
                          className="tableTable"
                          align="left"
                        ></StyledTableCell>
                        <StyledTableCell
                          className="tableTable"
                          align="left"
                        ></StyledTableCell>
                      </TableRow>
                    </TableBody>
                    <TableBody>
                      {movie
                        .filter(
                          (asd) =>
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
                <button style={{"marginTop":"20px", "padding":"10px", "width":"200px", "color":"white"}} className="AddGame" onClick={addMovie}>
                Add New Movie
              </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default MovieTable;
