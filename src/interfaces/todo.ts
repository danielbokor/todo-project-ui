import { User } from "./user";

export interface Todo {
  id: string;
  title: string;
  isCompleted: boolean;
  user: User;
}
