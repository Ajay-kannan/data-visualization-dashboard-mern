import React, { useState } from "react";
import { Sidebar, Menu, MenuItem, useProSidebar } from "react-pro-sidebar";
import "../App.css";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import LocationCityRoundedIcon from "@mui/icons-material/LocationCityRounded";
import TopicRoundedIcon from "@mui/icons-material/TopicRounded";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import PublicRoundedIcon from "@mui/icons-material/PublicRounded";

import { Link } from "react-router-dom";
import Dashboard from "./Dashboard";

const SidebarApp = () => {
  const { collapseSidebar } = useProSidebar();
  const [collapse, setCollapse] = useState(false);
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar className="app">
        <Menu>
          <MenuItem
            className="menu1"
            icon={<MenuRoundedIcon />}
            onClick={() => {
              collapseSidebar();
              setCollapse(!collapse);
            }}
          >
            <h2>Menu</h2>
          </MenuItem>
          <MenuItem
            component={<Link to="dashboard" className="link" />}
            icon={<DashboardRoundedIcon />}
          >
            {" "}
            Dashboard{" "}
          </MenuItem>
          <MenuItem
            component={<Link to="country" className="link" />}
            icon={<PublicRoundedIcon />}
          >
            {" "}
            Country{" "}
          </MenuItem>
          <MenuItem
            component={<Link to="topics" className="link" />}
            icon={<TopicRoundedIcon />}
          >
            {" "}
            Topics{" "}
          </MenuItem>
          <MenuItem
            component={<Link to="city" className="link" />}
            icon={<LocationCityRoundedIcon />}
          >
            {" "}
            Sector{" "}
          </MenuItem>
        </Menu>
      </Sidebar>
      <section className={collapse ? "section-collapse" : "section-normal"}>
        <Dashboard />
      </section>
    </div>
  );
};

export default SidebarApp;
