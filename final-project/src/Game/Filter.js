import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Select from "react-select";
import { Container } from "react-bootstrap";

const Filter = () => {
  const url = "https://super-bootcamp-backend.sanbersy.com";
  const [game, setGame] = useState([]);
  const [fetchTrigger, setFetchTrigger] = useState(true);

  const [countryid, setCountryid] = useState("");

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

  const handlecountry = (event) => {
    const getcoutryid = event.target.value;
    setCountryid(getcoutryid);
    event.preventDefault();
  };

  return (
    <>
      <Container className="content contentSelect">
        <div className="row">
          <div className="col-sm-12">
            <div className="row mb-3">
              <div className="form-group col-md-4">
                <h5 className="mb-2">Genre</h5>
                <select
                  name="country"
                  className="form-control"
                  onChange={(e) => handlecountry(e)}
                >
                  <option>--Select Genre--</option>
                  {game.map((item) => (
                    <option key={item.id} value={item.id}>
                      {" "}
                      {item.genre}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group col-md-4">
                <h5 className="mb-2">Release</h5>
                <select name="state" className="form-control">
                  <option>--Select Release--</option>
                  {game.map((item, index) => (
                    <option key={index} value={item.id}>
                      {item.release}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group col-md-4">
                <h5 className="mb-2">Platform</h5>
                <select name="state" className="form-control">
                  <option>--Select Platform--</option>
                  {game.map((item, index) => (
                    <option key={index} value={item.id}>
                      {item.platform}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group col-md-2 mt-4">
                <button className="btn btn-success mt-2">Submit</button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};
export default Filter;
