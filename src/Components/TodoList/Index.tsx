// src/components/custom/TodoList/index.tsx
import React from "react";
import { ITask } from "../../State/TodoStore"; // Ensure correct import path
import FormButton from "../../Components/base/FormButton/index"; // Ensure correct import path

interface TodoListProps {
  todoList: ITask[];
  completeTask: (taskId: number) => void; // Ensure type matches
}

const TodoList: React.FC<TodoListProps> = ({ todoList, completeTask }) => {
  return (
    <div className="todoList">
      {todoList.map((task) => (
        <div key={task.id} className="task">
          <div className="content">
            <span>{task.taskName}</span>
            <span>{task.deadline}{""} days</span>
          </div>
          <FormButton 
            type="delete" // Specify as delete type
            variant="danger" // Use danger variant for delete
            buttonName="Delete" // Update button name to "Delete"
            onDelete={completeTask} // Pass completeTask directly
            id={task.id} // Pass task ID
          />
        </div>
      ))}
    </div>
  );
};

export default TodoList;
