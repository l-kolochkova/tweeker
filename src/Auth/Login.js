import React, { useEffect, useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState();
  const [pwd, setPwd] = useState();
  const navigate = useNavigate();
  const [validity, setValidity] = useState(false);
  const [result, setResult] = useState();

  useEffect(() => {
    setValidity(document.getElementById("lgn").checkValidity());
  }, [email, pwd]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && pwd) {
      fetch("https://serene-depths-70383.herokuapp.com/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email, password: pwd }),
      })
        .then((data) => {
          if (data.ok) return data.json();
          throw new Error(data.status);
        })
        .then((data) => {
          // console.log(data);
          localStorage.setItem("token", data.accessToken);
          localStorage.setItem("uname", data.uname);
          localStorage.setItem("uid", data.uid);
          navigate("/home");
        })
        .catch((e) => {
          setResult("Log in failed. Check your email/password and try again.");
          setValidity(false);
        });
    }
  };

  return (
    <div className="login-page">
      <form id="lgn" className="login-form" onSubmit={handleSubmit}>
        <h1>Log In</h1>
        <div className="email-input">
          <label>Email</label>
          <input
            type="text"
            pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
            required
            placeholder="web@email.com"
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </div>

        <div className="pwd-input">
          <label>Password</label>
          <input
            required
            placeholder="very strong and reliable"
            type="password"
            onChange={(e) => setPwd(e.target.value)}
          ></input>
        </div>
        <button disabled={!validity}>Log in</button>
        {result && <div className="fail-msg">{result}</div>}
        <div className="signup-section">
          <label>Don't have an account yet?</label>
          <Link to={"/register"}>Sign Up</Link>
        </div>
      </form>
    </div>
  );
}
