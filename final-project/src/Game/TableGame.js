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
import { red } from "@mui/material/colors";

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
                    <TableHead>
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
                    </TableHead>
                    <TableBody>
                      {game
                        .filter(
                          (asd) =>
                            asd.name.toLowerCase().includes(search1) ||
                            asd.genre.toLowerCase().includes(search1)
                        )
                        .map((item, index) => (
                          <StyledTableRow key={index}>
                            <StyledTableCell component="th" scope="row">
                              <img
                                className="imgTable"
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
