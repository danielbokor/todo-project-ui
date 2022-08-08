import * as React from "react";
import { Todo } from "../interfaces/todo";
import { Filter } from "./Filter";
import { TodoItem } from "./TodoItem";

export function TodosList({ todos }: { todos: Todo[] }) {
  const [filteredTodos, setFilteredTodos] = React.useState(todos);

  return (
    <>
      <ul>
        {filteredTodos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>
      <Filter todos={todos} setFilteredTodos={setFilteredTodos} />
    </>
  );
}
