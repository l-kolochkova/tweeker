import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Logout() {
    const navigate = useNavigate()

    useEffect(() => {
        localStorage.clear()
        navigate("/login")
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return <div></div>;
}