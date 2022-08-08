import * as React from "react";
// import Box from "@mui/material/Box";
// import { TextField, Input } from "@mui/material";
import { useQuery } from "@apollo/client";
import { LIST_TODOS, ListTodoData } from "./queries/listTodos";
import { AddTodo } from "./AddTodo";
import { TodosList } from "./TodosList";

function Todos() {
  const { loading, error, data } = useQuery<ListTodoData>(LIST_TODOS);

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
