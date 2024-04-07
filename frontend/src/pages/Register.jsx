import React from "react";
import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { toast } from "react-toastify";

const Register = () => {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Password must match, please try again!");
      setFormData((prevState) => ({
        ...prevState,
        password: "",
        confirmPassword: "",
      }));
      return;
    }
  };

  return (
    <>
      <section className="heading">
        <h1>
          <FaUser /> Register
        </h1>
        <p>Create an account to get all features for free!</p>
      </section>

      <section className="form">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              required
              type="text"
              className="form-control"
              id="name"
              value={formData.full_name}
              onChange={(e) =>
                setFormData((prevState) => ({
                  ...prevState,
                  full_name: e.target.value,
                }))
              }
              placeholder="Enter your full name"
            />
          </div>
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
            <input
              required
              type="password"
              className="form-control"
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData((prevState) => ({
                  ...prevState,
                  confirmPassword: e.target.value,
                }))
              }
              placeholder="Confirm your password"
              autoComplete="on"
            />
          </div>
          <div className="form-group">
            <button className="btn btn-block">Submit </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default Register;
