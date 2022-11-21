import React, { useState, useEffect } from "react";
import PostPreview from "../PostPreview/PostPreview";
import { useParams, useNavigate } from "react-router-dom";
import "./Profile.css";

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const [posts, setPosts] = useState();
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  const uid = useParams().uid;

  useEffect(() => {
    const fetchUser = () => {
      fetch("https://serene-depths-70383.herokuapp.com/user/" + uid + "/", {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
        .then((response) => {
          if (response.ok) return response.json();
          else throw new Error(response.status);
        })
        .then((data) => setUser(data))
        .catch((res) => {
          if(res.message === "404") navigate("/notfound");
          else navigate("/logout")
        });
    };

    fetchUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const fetchPosts = () => {
      fetch("https://serene-depths-70383.herokuapp.com/user/" + uid + "/note/", {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
        .then((response) => {
          if (response.ok) return response.json();
          else throw new Error(response.json());
        })
        .then((data) => setPosts(data))
        .catch((res) => {
          // console.log(res.message)
          if(res.message === "404") navigate("/notfound")
          else navigate("/logout");
        });
    };
    if (user) fetchPosts();
  }, [user]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleDeleteClick = () => {
    const conf = window.confirm("Do you really want to delete your account?");
    if (conf === true) setDeleteConfirm(true);
  };

  useEffect(() => {
    if (deleteConfirm) {
      fetch("https://serene-depths-70383.herokuapp.com/user/" + uid + "/", {
        method: "DELETE",
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },

      })
        .then((res) => {
          if(res.ok) navigate("/logout");
          else throw new Error(res.status)
        })
        .catch((res) => {
          // console.log(res.message)
          if(res.message === "404") navigate("/notfound")
          else navigate("/logout");
        });
    }
  }, [deleteConfirm]); // eslint-disable-line react-hooks/exhaustive-deps

  //   return (
  //     <>
  //       {// console.log(user,
  //       posts,
  //       deleteConfirm)}
  //     </>
  //   );
  return (
    (user && (
      <div className="full-profile">
        <div className="profile">
          <div className="personal-info">
            <img
              className="pfp"
              src="https://i.pinimg.com/736x/6e/67/5d/6e675d465be41e0b8f4f3f7983869508.jpg"
              alt="Author's profile pic"
            />
            <span className="username">{user.name}</span>

            <span className="post-count">Posts: {posts && posts.length}</span>
          </div>

          <div
            className={
              uid === localStorage.getItem("uid") ? "tools" : "no-tools"
            }
          >
            <a href="/#" className="edit">
              Edit
            </a>
            <button onClick={handleDeleteClick} className="delete">
              Delete account
            </button>
          </div>
        </div>

        <div className="posts">
          {posts?.length
            ? posts.map((post) => (
                <PostPreview key={post.id} to_render={post} />
              ))
            : "This user has no posts yet..."}
        </div>
      </div>
    )) || <div>Nothing here yet...</div>
  );
}
