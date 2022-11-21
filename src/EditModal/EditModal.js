import { React, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./EditModal.css";

export default function EditModal(props) {
  const location = useLocation();
  const navigate = useNavigate();
  const postUrl = location.pathname.substring(
    0,
    location.pathname.lastIndexOf("/")
  );

  const [name, setName] = useState(props.post.name);
  const [description, setDescription] = useState(props.post.description);
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPost = { name, description, count_of_users: 0 };

    fetch("https://serene-depths-70383.herokuapp.com/note/" + props.post.id + "/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify(newPost),
    })
      .then((res) => {
        if (res.ok) {
          setIsSaving(true);
          props.callb(newPost);
          navigate(postUrl, { replace: true });
          return res.json();
        } else throw new Error(res.status);
      })
      .catch((res) => {
        // console.log(res.message);
        if (res.message === "404") navigate("/notfound");
        if (res.message === "400") alert("Failed editing", res.message);
        else navigate("/logout");
        
      });
  };

  return (
    <div className="dummy">
      <form className="edit-modal" onSubmit={handleSubmit}>
        <h1>Edit post</h1>
        <div className="title-edit">
          <label>Title</label>
          <input
            defaultValue={name}
            onChange={(e) => setName(e.target.value)}
          ></input>
        </div>
        <div className="desc-edit">
          <label>Description</label>
          <textarea
            autoFocus
            onFocus={(e) => e.currentTarget.select()}
            maxLength={70}
            defaultValue={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div className="modal-buttons">
          {!isSaving && (
            <>
              <button>Save changes</button>
              <button onClick={() => navigate(postUrl)}>Cancel</button>
            </>
          )}
          {isSaving && (
            <>
              <button disabled>Saving changes...</button>
              <button disabled onClick={() => navigate(postUrl)}>
                Cancel
              </button>
            </>
          )}
        </div>
      </form>
    </div>
  );
}
