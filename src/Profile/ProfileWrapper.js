import React from "react";
import Profile from './Profile'
import { useParams } from "react-router-dom";

export default function ProfileWrapper() {
  const { uid } = useParams();

  return <Profile key={uid} />;
}
