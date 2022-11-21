import React, { useEffect, useState } from "react";
import {
  useLocation,
  useParams,
  Link,
  useNavigate,
  Routes,
  Route,
} from "react-router-dom";
import { PrivateRoute } from "../Auth/Auth";
import EditModal from "../EditModal/EditModal";
import "./PostView.css";

export default function PostView() {
  const navigate = useNavigate();
  const location = useLocation();
  const [prevUrl, ] = useState(location.state?.prevUrl || "/home"); 
  const [post, setPost] = useState();
  const [user, setUser] = useState();
  const [rerender, setRerender] = useState();
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const { uid, id } = useParams();

  // console.log(rerender)

  useEffect(() => {
    if (rerender) {
      handleNoPost();
    }
  }, [rerender]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleNoPost = () => {
    const fetchPost = () => {
      fetch("https://serene-depths-70383.herokuapp.com/feed/" + id + "/", {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
        .then((res) => {
          if (res.ok) return res.json();
          else throw new Error(res.status);
        })
        .then((data) => {
          setPost(data);
          // console.log(data);
        })
        .catch((res) => {
          // console.log(res.message);
          if (res.message === "404") navigate("/notfound");
          else navigate("/logout");
        });
    };

    fetchPost();
  };

  const handleNoAuthor = () => {
    const fetchAuthor = () => {
      fetch("https://serene-depths-70383.herokuapp.com/user/" + uid + "/", {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
        .then((res) => {
          if (res.ok) return res.json();
          else throw new Error(res.status);
        })
        .then((data) => {
          setUser(data);
          // console.log(data);
        })
        .catch((res) => {
          // console.log(res);

          // console.log(res.message);
          if (res.message === "404") navigate("/notfound");
          else navigate("/logout");
        });
    };

    fetchAuthor();
  };

  // const handleNoAuthor = () => {
  //   const fetchAuthor = () => {
  //     fetch("https://serene-depths-70383.herokuapp.com/user/" + uid + "/")
  //       .then((response) => JSON.stringify(response))
  //       .then((data) => {
  //         setUser(data);
  //       })
  //       .catch(() => navigate("/notfound"));
  //   };

  //   fetchAuthor();
  // };

  useEffect(() => {
    handleNoAuthor();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (user) handleNoPost();
  }, [user]); // eslint-disable-line react-hooks/exhaustive-deps

  const handlePostDelete = () => {
    setDeleteConfirm(true);
  };

  useEffect(() => {
    if (deleteConfirm) {
      // setPost();
      // setUser();

      fetch("https://serene-depths-70383.herokuapp.com/note/" + id + "/", {
        method: "DELETE",
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
        .then((res) => {
          if (res.status === 204) return res.status;
          else throw new Error(res.status);
        })
        .then((data) => {
          setPost();
          setUser();
          navigate(prevUrl || -1);
        })
        .catch((res) => {
          // console.log(res.message);
          if (res.message === "404") navigate("/notfound");
          else navigate("/logout");
        });
    }
  }, [deleteConfirm]); // eslint-disable-line react-hooks/exhaustive-deps

  return post ? (
    <div className="post-full">
      <div className="main">
        <div className="post-meta">
          <Link to={"/" + uid} state={user} className="author">
            <img
              className="pfp"
              src="https://i.pinimg.com/736x/6e/67/5d/6e675d465be41e0b8f4f3f7983869508.jpg"
              alt="Author's profile pic"
            />
            <p className="username">{post.username}</p>
          </Link>

          <p className="posted-date">11.11.11</p>
        </div>

        <div className="post-content">
          <h2>{post.name}</h2>
          <p>{post.description}</p>
        </div>

        <div
          className={
            uid === localStorage.getItem("uid") ? "post-tools" : "no-post-tools"
          }
        >
          <button className="edit" onClick={() => navigate("edit")}>
            Edit
          </button>
          <button className="delete" onClick={handlePostDelete}>
            Delete
          </button>
          <a href="/#" className="history"> 
            View history
          </a>
        </div>
      </div>

      <Routes>
        <Route
          exact
          path={"edit/"}
          element={
            <PrivateRoute>
              <EditModal post={post} callb={(p) => setRerender(p)} />
            </PrivateRoute>
          }
        ></Route>
      </Routes>
    </div>
  ) : (
    ""
  );
} 
