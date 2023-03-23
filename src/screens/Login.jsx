import React, { useState, useContext } from "react";
import { TextField, Button } from "@mui/material";
import FormControl from "@mui/material/FormControl";

import { Context as AuthContext } from "../context/authContext";

import "./Login.css";

const Login = () => {
  const { state: authState, login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="loginForm">
      <h1 style={{}}>Please sign in</h1>
      <div className="loginFormControl">
        <FormControl fullWidth margin="normal">
          <TextField
            label="Email"
            required
            margin="normal"
            variant="standard"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={authState.errorMessage ? true : false}
          />
          <TextField
            label="Password"
            required
            margin="normal"
            variant="standard"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            error={authState.errorMessage ? true : false}
          />
          <Button
            variant="contained"
            style={{ margin: "5% 0" }}
            onClick={() => login({ email, password })}
          >
            Login
          </Button>
        </FormControl>
      </div>
    </div>
  );
};

export default Login;
