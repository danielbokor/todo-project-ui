import { useMutation } from "@apollo/client";
import { Button, Input } from "@mui/material";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { LOGIN, Tokens } from "./mutations/login";

export default function Login() {
  const navigate = useNavigate();
  const [signup, { data }] = useMutation<
    { login: Tokens },
    { email: string; password: string }
  >(LOGIN);

  const submitHandler = (event: any) => {
    event.preventDefault();

    const {
      email: { value: email },
      password: { value: password },
    } = event.target.elements;

    signup({ variables: { email, password } });
  };

  React.useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  React.useEffect(() => {
    if (!data?.login) {
      return;
    }

    const { accessToken, refreshToken } = data.login;

    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);

    navigate("/", { replace: true });
  }, [data, navigate]);

  return (
    <div>
      <h1>Welcome back!</h1>
      <p>Log in to continue.</p>
      <form onSubmit={submitHandler}>
        <Input id="email" type="email" placeholder="Email" />
        <Input id="password" type="password" placeholder="Password" />
        <Link to="/signup">Don't have an account? Sign up.</Link>
        <Button variant="contained" type="submit">
          Log in to continue.
        </Button>
      </form>
    </div>
  );
}
