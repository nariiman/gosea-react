import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function SignIn() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:3000/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Invalid credentials");
      }

      // Save token
      localStorage.setItem("token", data.token);

      // Redirect to homepage
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="page-container">
      <h1 className="page-title">Sign In</h1>

      <form className="contact-form" onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button type="submit">Login</button>
      </form>

      <p style={{ marginTop: "15px" }}>
        Don't have an account?{" "}
        <Link
          to="/signup"
          style={{ color: "#3366FF", textDecoration: "underline" }}
        >
          Sign Up
        </Link>
      </p>
    </div>
  );
}

export default SignIn;
