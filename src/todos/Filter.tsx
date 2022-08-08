import React from "react";
import { Dispatch, SetStateAction } from "react";
import { Todo } from "../interfaces/todo";

const options = ["all", "complete", "incomplete"];

export function Filter({
  todos,
  setFilteredTodos,
}: {
  todos: Todo[];
  setFilteredTodos: Dispatch<SetStateAction<Todo[]>>;
}) {
  const [currentOption, setCurrentOption] = React.useState(options[0]);

  React.useEffect(() => {
    switch (currentOption) {
      case "all":
        setFilteredTodos([...todos]);
        break;

      case "complete":
        setFilteredTodos(todos.filter((todo) => todo.isCompleted === true));
        break;

      case "incomplete":
        setFilteredTodos(todos.filter((todo) => todo.isCompleted === false));
        break;
    }
  }, [currentOption, setFilteredTodos, todos]);

  return (
    <span>
      Show:{" "}
      {options.map((option) =>
        currentOption === option ? (
          <span key={option}>option</span>
        ) : (
          <button
            key={option}
            onClick={() => {
              setCurrentOption(option);
            }}
          >
            {option}
          </button>
        )
      )}
    </span>
  );
}
