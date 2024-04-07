import React from "react";
import { useState } from "react";
import { FaSignInAlt } from "react-icons/fa";
import { toast } from "react-toastify";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Log in successful");
  };

  return (
    <>
      <section className="heading">
        <h1>
          <FaSignInAlt /> Login
        </h1>
        <p>Pick up where you left off!</p>
      </section>

      <section className="form">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              required
              type="text"
              className="form-control"
              id="email"
              value={formData.email}
              onChange={(e) =>
                setFormData((prevState) => ({
                  ...prevState,
                  email: e.target.value,
                }))
              }
              placeholder="Enter your email"
            />
          </div>
          <div className="form-group">
            <input
              required
              type="password"
              className="form-control"
              id="password"
              value={formData.password}
              onChange={(e) =>
                setFormData((prevState) => ({
                  ...prevState,
                  password: e.target.value,
                }))
              }
              placeholder="Enter your password"
              autoComplete="on"
            />
          </div>
          <div className="form-group">
            <button className="btn btn-block">Login </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default Login;
