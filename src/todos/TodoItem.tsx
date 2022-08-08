import React from "react";
import { useMutation } from "@apollo/client";
import { Checkbox, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Todo } from "../interfaces/todo";
import { UpdateTodo, UPDATE_TODO } from "./mutations/updateTodo";
import { LIST_TODOS } from "./queries/listTodos";
import { DeleteTodo, DELETE_TODO } from "./mutations/deleteTodo";

export function TodoItem({ todo: { id, isCompleted, title } }: { todo: Todo }) {
  const [updateTodo] = useMutation<
    { updateTodo: UpdateTodo },
    { id: string; isCompleted: boolean }
  >(UPDATE_TODO, {
    refetchQueries: [{ query: LIST_TODOS }], //TODO use updater function instead
  });

  const [deleteTodo] = useMutation<{ deleteTodo: DeleteTodo }, { id: string }>(
    DELETE_TODO,
    {
      refetchQueries: [{ query: LIST_TODOS }], //TODO use updater function instead
    }
  );

  const handleUpdateTodo = (id: string) => {
    updateTodo({
      variables: {
        id,
        isCompleted: !isCompleted,
      },
    });
  };

  const handleRemoveTodo = (id: string) => {
    deleteTodo({
      variables: {
        id,
      },
    });
  };

  return (
    <li>
      <Checkbox checked={isCompleted} onClick={() => handleUpdateTodo(id)} />
      {title}
      <IconButton aria-label="remove" onClick={() => handleRemoveTodo(id)}>
        <CloseIcon />
      </IconButton>
    </li>
  );
}
