import React from "react";
import { useState, useEffect } from "react";
import PostPreview from "../PostPreview/PostPreview";
import "./Feed.css";
import { useNavigate } from "react-router-dom";

export default function Feed(props) {
  const [posts, setPosts] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = () => {
      fetch("https://serene-depths-70383.herokuapp.com/feed/", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
        .then((response) => {
          if (!response.ok) throw new Error(response.status);
          else return response.json();
        })
        .then((data) => setPosts(data))
        .catch((e) => {
          // console.log(e.message);
          navigate("/logout");
        });
    };

    fetchData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="feed">
      {posts?.length ? (
        posts.map((post) => <PostPreview key={post.id} to_render={post} />)
      ) : (
        <p className="empty-feed">"Nothing here yet..."</p>
      )}
    </div>
  );
}
