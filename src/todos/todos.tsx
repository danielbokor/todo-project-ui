import * as React from "react";
// import Box from "@mui/material/Box";
// import { TextField, Input } from "@mui/material";
import { useQuery } from "@apollo/client";
import { LIST_TODOS, ListTodoData } from "./queries/listTodos";
import { AddTodo } from "./AddTodo";
import { TodosList } from "./TodosList";
import { useNavigate } from "react-router-dom";

function Todos() {
  const navigate = useNavigate();
  const { loading, error, data } = useQuery<ListTodoData>(LIST_TODOS);

  React.useEffect(() => {
    const refreshToken = localStorage.getItem("refreshToken");

    if (!refreshToken) {
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{`Error! ${error.message}`}</div>;

  return (
    <div>
      <h1>Todos:</h1>
      <AddTodo />
      {data?.listTodos && <TodosList todos={data.listTodos} />}
    </div>
  );
}

export default Todos;
