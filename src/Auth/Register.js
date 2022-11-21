import React, { useEffect, useState } from "react";
import "./Register.css";
import { Link } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState();
  const [name, setName] = useState();
  const [pwd, setPwd] = useState();
  const [success, setSuccess] = useState(false)
  const [validity, setValidity] = useState(false)
  const [result, setResult] = useState()

    useEffect(() => {
        setValidity(document.getElementById('snp').checkValidity())
    }, [email, name, pwd])

    useEffect(() => {
        if(success) document.getElementById('snp').reset()
    }, [success])

  const handleChange = (setter, val) => {
    setter(val);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("https://serene-depths-70383.herokuapp.com/user/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email, name: name, password: pwd }),
    })
    .then((res) => {
        if(res.ok) {
            setSuccess(true)
            setResult("Signed up successfully! You may sign in now.")
        }
        else throw new Error(res.status)
    })
    .catch((e) => {
        setValidity(false)
        setResult("Sign up failed. Email and name must be unique and not empty.")
        setSuccess(false)
    })
  };

  return (
    <div className="signup-page">
      <form id="snp" className="signup-form" onSubmit={handleSubmit}>
        <h1>Sign Up</h1>
        <div className="email-input">
          <label>Email</label>
          <input
            placeholder="web@email.com"
            required
            type="text"
            pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
            maxLength={30}
            onChange={(e) => handleChange(setEmail, e.target.value)}
          ></input>
        </div>

        <div className="name-input">
          <label>Name</label>
          <input
            placeholder="Lidiia"
            required
            minLength={3}
            maxLength={30}
            onChange={(e) => handleChange(setName, e.target.value)}
          ></input>
        </div>

        <div className="pwd-input">
          <label>Password</label>
          <input
            placeholder="very strong and reliable"
            required
            maxLength={30}
            minLength={4}
            type="password"
            onChange={(e) => handleChange(setPwd, e.target.value)}
          ></input>
        </div>
        <button type="submit" onClick={handleSubmit} disabled={!validity}>Sign in</button>
        {result && <div className="success-msg">{result}</div>}
        <div className="login-section">
          <label>Already have an account?</label>
          <Link to={"/login"}>Sign In</Link>
        </div>
      </form>
    </div>
  );
}
