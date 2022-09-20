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

const TableGame = () => {
  let history = useHistory();
  const [user] = useContext(UserContext);
  const url = "https://super-bootcamp-backend.sanbersy.com";
  const [game, setGame] = useState([]);
  const [fetchTrigger, setFetchTrigger] = useState(true);
  const [search1, setSearch1] = useState("");
  const [filterGame, setFilterGame] = useState("");
  const [sortedField, setSortedField] = useState("ASC");
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
  // handle change event of search input
  // Search Item by Name

  const handleGenre = (event) => {
    const getFilterGame = event.target.value.toLowerCase();
    // if (getFilterGame == "--select genre--") {
    //   window.location.reload();
    // } else {
    const filtered = [...game].filter((item) => {
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
    const filtered = [...game].filter((item) => {
      return item.release.toLowerCase() === getFilterGame;
    });
    console.log(filtered);
    // alert(filtered);
    setGame(filtered);
    // setSearch1(getFilterGame);
    // event.preventDefault();
    // console.log(search1);
    // }
  };

  const handlePlatform = (event) => {
    const getFilterGame = event.target.value.toLowerCase();

    const filtered = [...game].filter((item) => {
      return item.platform.toLowerCase() === getFilterGame;
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

  //addGame
  const addGame = () => {
    history.push("/game/table/create");
  };

  //editGame
  const handleEdit = async (event) => {
    let idGame = Number(event.target.value);
    history.push(`/game/table/${idGame}/edit`);
  };

  //deleteGame
  const handleDelete = (event) => {
    let idGame = parseInt(event.target.value);
    axios
      .delete(`${url}/api/games/${idGame}`, {
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
              Table Game
              {/* //Select */}
              <Container className="content contentSelect">
                <div className="row">
                  <div className="col-sm-12">
                    <div className="row mb-3">
                      <div className="form-group col-md-3">
                        <h5 className="mb-2">Genre</h5>
                        <select
                          name="country"
                          className="form-control"
                          onChange={(e) => handleGenre(e)}
                        >
                          <option>--Select Genre--</option>
                          {game.map((item) => (
                            <option key={item.id} value={item.genre}>
                              {" "}
                              {item.genre}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="form-group col-md-3">
                        <h5 className="mb-2">Release</h5>
                        <select
                          name="state"
                          className="form-control"
                          onChange={(e) => handleRelease(e)}
                        >
                          <option>--Select Release--</option>
                          {game.map((item, index) => (
                            <option key={index} value={item.release}>
                              {item.release}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="form-group col-md-3">
                        <h5 className="mb-2">Platform</h5>
                        <select
                          name="state"
                          className="form-control"
                          onChange={(e) => handlePlatform(e)}
                        >
                          <option>--Select Platform--</option>
                          {game.map((item, index) => (
                            <option key={index} value={item.platform}>
                              {item.platform}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="form-group col-md-3">
                        <button className="btnReset" onClick={btnReset}>
                          Reset
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </Container>
              {/* //select */}
            </div>

            <div className="GameContainer">
              <div className="tableContainer">
                <button className="AddGame" onClick={addGame}>
                  Add Game
                </button>
                <input
                  className="inputSearch"
                  type="text"
                  value={search1}
                  onChange={(e) => setSearch1(e.target.value.toLowerCase())}
                  placeholder="Search by Name ...."
                ></input>
                {/* <input
                  className="inputSearch"
                  type="text"
                  value={countryid2}
                  onChange={() => setCountryid2(())}
                  placeholder="Search by Genrr ...."
                ></input> */}
                <TableContainer component={Paper} className="tableGame">
                  <Table
                    sx={{ Width: 700 }}
                    stickyHeader
                    aria-label="sticky table"
                    className="tableGame1"
                  >
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
                          Single Player
                        </StyledTableCell>
                        <StyledTableCell className="tableTable" align="left">
                          Multi Player
                        </StyledTableCell>
                        <StyledTableCell className="tableTable" align="left">
                          Platform
                        </StyledTableCell>
                        <StyledTableCell className="tableTable" align="left">
                          Release
                        </StyledTableCell>
                        <StyledTableCell className="tableTable" align="left">
                          Action
                        </StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <StyledTableCell className="tableTable">
                          <button
                            className="buttonGames"
                            onClick={() => sorting("image_url")}
                          >
                            Sort
                          </button>
                        </StyledTableCell>
                        <StyledTableCell className="tableTable" align="left">
                          <button
                            className="buttonGames"
                            onClick={() => sorting("name")}
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
                          <button
                            className="buttonGames"
                            onClick={() => sorting("singlePlayer")}
                          >
                            Sort
                          </button>
                        </StyledTableCell>
                        <StyledTableCell className="tableTable" align="left">
                          <button
                            className="buttonGames"
                            onClick={() => sorting("multiplayer")}
                          >
                            Sort
                          </button>
                        </StyledTableCell>
                        <StyledTableCell className="tableTable" align="left">
                          <button
                            className="buttonGames"
                            onClick={() => sorting("platform")}
                          >
                            Sort
                          </button>
                        </StyledTableCell>
                        <StyledTableCell className="tableTable" align="left">
                          <button
                            className="buttonGames"
                            onClick={() => sorting("release")}
                          >
                            Sort
                          </button>
                        </StyledTableCell>
                        <StyledTableCell
                          className="tableTable"
                          align="left"
                        ></StyledTableCell>
                      </TableRow>
                    </TableBody>
                    <TableBody>
                      {game
                        .filter(
                          (asd) =>
                            asd.name?.toLowerCase().includes(search1) ||
                            asd.genre?.toLowerCase().includes(search1)
                        )
                        .map((item, index) => (
                          <StyledTableRow className="tableCol" key={index}>
                            <StyledTableCell
                              // className="tableCol"
                              component="th"
                              scope="row"
                            >
                              <img
                                className="imgTable2"
                                src={item.img}
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
                              {item.single === 1 ? "Ya" : "Tidak"}
                            </StyledTableCell>
                            <StyledTableCell
                              className="tableCell"
                              align="right"
                            >
                              {item.multi === 1 ? "Ya" : "Tidak"}
                            </StyledTableCell>
                            <StyledTableCell
                              className="tableCell"
                              align="right"
                            >
                              {item.platform}
                            </StyledTableCell>
                            <StyledTableCell
                              className="tableCell"
                              align="right"
                            >
                              {item.release}
                            </StyledTableCell>
                            {user ? (
                              <StyledTableCell
                                className="tableCell"
                                align="right"
                              >
                                <span>
                                  <button
                                    className="btnTableGame"
                                    onClick={handleEdit}
                                    value={item.id}
                                  >
                                    Edit
                                  </button>
                                </span>
                                <span>
                                  <button
                                    className="btnTableGame"
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
export default TableGame;
