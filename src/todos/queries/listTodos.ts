import { gql } from "@apollo/client";
import { Todo } from "../../interfaces/todo";

export const LIST_TODOS = gql`
  query ListTodos {
    listTodos {
      id
      title
      isCompleted
    }
  }
`;

export interface ListTodoData {
  listTodos: Todo[];
}
