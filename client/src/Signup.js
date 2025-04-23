import React from "react";
import { useFormik } from "formik";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function Signup() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: { username: "", password: "", email: "" },
    onSubmit: async (values) => {
      try {
        await axios.post("http://localhost:5555/signup", values, {
          withCredentials: true,
        });
        navigate("/login");
      } catch (err) {
        alert("Username/email may already exist");
      }
    },
  });

  return (
    <div className="signup-container">
      <form onSubmit={formik.handleSubmit}>
        <h2>Signup</h2>
        <input
          name="username"
          onChange={formik.handleChange}
          value={formik.values.username}
          placeholder="Username"
        />
        <input
          name="email"
          onChange={formik.handleChange}
          value={formik.values.email}
          placeholder="Email"
        />
        <input
          name="password"
          type="password"
          onChange={formik.handleChange}
          value={formik.values.password}
          placeholder="Password"
        />
        <button type="submit">Signup</button>
      </form>
      <p>
        Already have an account? <Link to="/login">Log In</Link>{" "}
        {/* 👈 Signup link */}
      </p>
    </div>
  );
}

export default Signup;
