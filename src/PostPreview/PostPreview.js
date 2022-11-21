import React from "react";
import { generatePath, Link, useLocation } from "react-router-dom";
import './PostPreview.css'

export default function PostPreview({ to_render }) {
    const postUrl = generatePath("/" + to_render.id_users + "/post/" + to_render.id)
    const location = useLocation()
  return (
    <div className="post-preview">
      <Link className="post" to={postUrl} state={{ prevUrl: location.pathname }}>
        <div className="post-meta">
          <div className="author">
            <img
              className="pfp"
              src="https://i.pinimg.com/736x/6e/67/5d/6e675d465be41e0b8f4f3f7983869508.jpg"
              alt="Author's profile pic"
            />
            <span className="username">{to_render.username}</span>
          </div>

          <span className="posted-date">11.11.11</span>
        </div>

        <div className="post-content">
          <h2>{to_render.name}</h2>
          <p align="justify">{to_render.description}</p>
        </div>
      </Link>
    </div>
  );
}
