import React from "react";
import { useMutation } from "@apollo/client";
import { CreateTodo, CREATE_TODO } from "./mutations/createTodo";
import { LIST_TODOS } from "./queries/listTodos";

export function AddTodo() {
  const [createTodo] = useMutation<
    { createTodo: CreateTodo },
    { title: string; isCompleted: boolean }
  >(CREATE_TODO, {
    refetchQueries: [{ query: LIST_TODOS }], //TODO use updater function instead
  });

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const title = event.target.elements.todo.value;

    createTodo({
      variables: {
        title,
        isCompleted: false,
      },
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Add new todo" id="todo" />
    </form>
  );
}
