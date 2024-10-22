// src/Components/custom/TodoList/index.tsx
import React from "react";
import ListItem from "../ListItem"; // Adjust this path if necessary
import { ITask } from "../../../State/TodoStore"; // Import the ITask interface

interface TodoListProps {
  todoList: ITask[]; // Expecting an array of tasks
  completeTask: (taskIdToDelete: number) => void; // Function to handle task completion
}

const TodoList: React.FC<TodoListProps> = ({ todoList, completeTask }) => {
  return (
    <div>
      <ListItem todoList={todoList} completeTask={completeTask} />
    </div>
  );
};

export default TodoList;
