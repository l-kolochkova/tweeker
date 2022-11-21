import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { AnonymousRoute, PrivateRoute } from "./Auth/Auth";
import E404 from "./E404/E404"
import Feed from "./Feed/Feed";
import Login from "./Auth/Login";
import Logout from "./Auth/Logout";
import Navigation from "./Navigation/Navigation";
import NavWrapper from "./Navigation/NavWrapper";
import PostWrapper from "./PostView/PostWrapper";
import ProfileWrapper from "./Profile/ProfileWrapper";
import Register from "./Auth/Register";
import Sidebar from "./Sidebar/Sidebar";

function App() {
  return (
    <>
      <NavWrapper><Navigation /></NavWrapper>
      <Sidebar />

      <Routes>
        <Route exact path="/" element={<Navigate to={"/home"} />}></Route>
        <Route path="/login" element={<AnonymousRoute><Login /></AnonymousRoute>}></Route>
        <Route path="/:uid/post/:id/*" element={<PrivateRoute><PostWrapper /></PrivateRoute>}></Route>
        <Route path="/home" element={<PrivateRoute><Feed /></PrivateRoute>}></Route>
        <Route path="/notfound" element={<E404 />}></Route>
        <Route path="/:uid" element={<PrivateRoute><ProfileWrapper /></PrivateRoute>}></Route>
        <Route path="/logout" element={<Logout />}></Route>
        <Route path="/register" element={<AnonymousRoute><Register /></AnonymousRoute>}></Route>
      </Routes>
    </>
  );
}

export default App;
