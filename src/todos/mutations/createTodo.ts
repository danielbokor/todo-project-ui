import { gql } from "@apollo/client";
import { Todo } from "../../interfaces/todo";

export const CREATE_TODO = gql`
  mutation CreateTodo($title: String!, $isCompleted: Boolean!) {
    createTodo(title: $title, isCompleted: $isCompleted) {
      id
      title
      isCompleted
    }
  }
`;

export interface CreateTodo {
  createTodo: Todo;
}
