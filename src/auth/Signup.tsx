import { useMutation } from "@apollo/client";
import { Button, Input } from "@mui/material";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { User } from "../interfaces/user";
import { SIGN_UP } from "./mutations/signUp";

export default function Signup() {
  const navigate = useNavigate();
  const [signup, { data }] = useMutation<
    { signUp: User },
    { name: string; email: string; password: string }
  >(SIGN_UP);

  const submitHandler = (event: any) => {
    event.preventDefault();

    const {
      name: { value: name },
      email: { value: email },
      password: { value: password },
    } = event.target.elements;

    signup({ variables: { name, email, password } });
  };

  React.useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  React.useEffect(() => {
    if (!data?.signUp) {
      return;
    }

    navigate("/login", { replace: true });
  }, [data, navigate]);

  return (
    <div>
      <h1>Welcome!</h1>
      <p>Sign up to start using Simpledo today.</p>
      <form onSubmit={submitHandler}>
        <Input id="name" placeholder="Full Name" />
        <Input id="email" type="email" placeholder="Email" />
        <Input id="password" type="password" placeholder="Password" />
        <Link to="/login">Do have an account? Sign in.</Link>
        <Button variant="contained" type="submit">
          Sign Up
        </Button>
      </form>
    </div>
  );
}
