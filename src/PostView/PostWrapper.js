import React from "react";
import PostView from './PostView.js'
import { useParams } from "react-router-dom";

export default function PostWrapper() {
  const { id } = useParams();

  return <PostView key={id} />;
}
