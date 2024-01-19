import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const host = "https://cloud-book-omega.vercel.app";
  const [auth, setAuth] = useState({ name: "", email: "", password: "" });

  const handleClick = async (e) => {
    e.preventDefault();
    const response = await fetch(`${host}/api/v1/auth/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        name: auth.name,
        email: auth.email,
        password: auth.password,
      }),
    });

    const jsondata = await response.json();
    console.log(jsondata.token);

    if (jsondata.success) {
      localStorage.setItem("token", jsondata.token);
      navigate("/Cloud-Book");
    } else {
      alert("Invalid credentials");
    }
  };
  const onChange = (e) => {
    setAuth({ ...auth, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <div
        className={`alert alert-primary ${
          localStorage.getItem("token") === null ? "visible" : "invisible"
        }`}
        role="alert"
      >
        Please login or signup to start keeping your notes
      </div>

      <form onSubmit={handleClick}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={auth.name}
            onChange={onChange}
            aria-describedby="emailHelp"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={auth.email}
            onChange={onChange}
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            value={auth.password}
            onChange={onChange}
            minLength={5}
            required
            id="password"
            name="password"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Signup;
