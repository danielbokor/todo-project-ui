import { gql } from "@apollo/client";
import { Todo } from "../../interfaces/todo";

export const UPDATE_TODO = gql`
  mutation UpdateTodo($id: String!, $isCompleted: Boolean!) {
    updateTodo(id: $id, isCompleted: $isCompleted) {
      id
      title
      isCompleted
      user {
        id
        email
      }
    }
  }
`;

export interface UpdateTodo {
  updateTodo: Todo;
}
