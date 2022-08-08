import { Todo } from "../interfaces/todo";
import { TodoItem } from "./TodoItem";

export function TodosList({ todos }: { todos: Todo[] }) {
  return (
    <>
      {todos && (
        <ul>
          {todos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </ul>
      )}
    </>
  );
}
