import { Sidenav, Nav, Toggle } from "rsuite";
import DashboardIcon from "@rsuite/icons/legacy/Dashboard";
import GroupIcon from "@rsuite/icons/legacy/Group";
import MagicIcon from "@rsuite/icons/legacy/Magic";
import GearCircleIcon from "@rsuite/icons/legacy/GearCircle";
import { useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../Auth/UserContext";
import axios from "axios";
import React, { useContext } from "react";

const SideNavMenu = () => {
  const [expanded, setExpanded] = useState(true);
  const [activeKey, setActiveKey] = useState("1");
  const [user] = useContext(UserContext);
  return (
    <div className="sideNav">
      {/* <Toggle
        className="togelSidenav"
        onChange={setExpanded}
        checked={expanded}
        checkedChildren="Expand"
        unCheckedChildren="Edit Menu"
      /> */}
      <Sidenav
        className="bgColor"
        expanded={expanded}
        defaultOpenKeys={["3", "4"]}
      >
        <Sidenav.Body>
          <Nav
            className="bgColor"
            activeKey={activeKey}
            onSelect={setActiveKey}
          >
            <Nav.Item className="bgColor" eventKey="2" icon={<GroupIcon />}>
              <Link to="/game/" className="textColorUser">
                {user.name}
              </Link>
            </Nav.Item>
            <Nav.Item className="bgColor" eventKey="2" icon={<GroupIcon />}>
              <Link to="/game/table" className="textColor">
                Dashboard
              </Link>
            </Nav.Item>
            <Nav.Item className="bgColor" eventKey="2" icon={<GroupIcon />}>
              <Link to="/game/table" className="textColor">
                List Game
              </Link>
            </Nav.Item>
            <Nav.Item className="bgColor" eventKey="2" icon={<GroupIcon />}>
              <Link to="/movie/table" className="textColor">
                List Movie
              </Link>
            </Nav.Item>
          </Nav>
        </Sidenav.Body>
        {/* <Sidenav.Toggle
          className="bgColor"
          expanded={expanded}
          onToggle={(expanded) => setExpanded(expanded)}
        /> */}
      </Sidenav>
    </div>
  );
};

export default SideNavMenu;
