import React from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import './CreateModal.css'

export default function CreateModal(props) {
  const location = useLocation();
  const setOpened = props.clb;
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const req = {
      name: name,
      description: description,
      count_of_users: 1,
    };

    fetch(
      "https://serene-depths-70383.herokuapp.com/user/" + localStorage.getItem("uid") + "/note/",
      {
        method: "POST",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(req),
      }
    ).then((res) => {
      const sts = res.status;

      if (sts === 201) {
        res.json().then((data) => {
          setOpened(false);
          navigate("/" + data.id_users + "/post/" + data.id);
        });
      }
      if (sts === 401) navigate("/logout", { state: { prevUrl: location.pathname }});
      if (sts === 400) alert("Title and description cannot be empty!");
      if (sts === 404) alert("Something went wrong...");
    });
  };

  return (
    <div className="dummy-create">
      <form className="create-modal">
        <h1>Create post</h1>
        <div className="title-create">
          <label>Title</label>
          <input onChange={(e) => setName(e.target.value)}></input>
        </div>
        <div className="desc-create">
          <label>Description</label>
          <textarea
            onChange={(e) => setDescription(e.target.value)}
            autoFocus
            maxLength={70}
          ></textarea>
        </div>
        <div className="modal-buttons">
          {true && (
            <>
              <button onClick={handleSubmit}>Post!</button>
              <button onClick={() => setOpened(false)}>Cancel</button>
            </>
          )}
          {false && (
            <>
              <button disabled>Posting...</button>
              <button disabled>Cancel</button>
            </>
          )}
        </div>
      </form>
    </div>
  );
}
