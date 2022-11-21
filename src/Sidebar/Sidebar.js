import React, { useState } from "react";
import CreateModal from "../CreateModal/CreateModal";
import "./Sidebar.css";
import { Link } from "react-router-dom";

export default function Sidebar() {
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [uname, setUname] = useState(localStorage.getItem('uname'))

  window.addEventListener('storage', () => {
    setUname(localStorage.getItem('uname'))
  })

  const handleClick = (e) => {
    setOpenCreateDialog(true);
  };

  return (
    <>
      <div className="sidebar">
        <div className="welcome">
          <div className="welcome-msg">Hello, <span id="uname">{uname}</span>!&#127756;</div>
          <Link to="/logout">Log Out</Link>
        </div>
        <div className="sidebar-items">
          <button onClick={handleClick}>Create post</button>
        </div>
      </div>
      {openCreateDialog && <CreateModal clb={(v) => setOpenCreateDialog(v)} />}
    </>
  );
}
