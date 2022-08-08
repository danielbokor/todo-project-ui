import { gql } from "@apollo/client";

export const DELETE_TODO = gql`
  mutation DeleteTodo($id: String!) {
    deleteTodo(id: $id) {
      success
    }
  }
`;

export interface DeleteTodo {
  deleteTodo: {
    success: boolean;
  };
}
