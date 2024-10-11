import React, { useState } from "react";
import { Button, TextField, Box, Typography } from "@mui/material";
import "./Login.css";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(username, password);
  };

  return (
    <Box className="login-container">
      <Typography variant="h2" className="login-title">
       
      </Typography>
      <Box className="login-box">
        <Typography variant="h4" gutterBottom className="login-header">
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            InputProps={{
              style: { color: "#ffffff" },
            }}
            className="login-input"
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              style: { color: "#ffffff" },
            }}
            className="login-input"
          />
          <Button type="submit" variant="contained" fullWidth className="login-button">
            Login
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default Login;