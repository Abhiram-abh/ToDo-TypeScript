import React from "react";
import { ITask } from "../../State/TodoStore";
import Button from "../Button";

interface TodoListProps {
  todoList: ITask[];
  completeTask: (taskNameToDelete: string) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todoList, completeTask }) => {
  return (
    <div className="todoList">
      {todoList.map((task, key) => (
        <div key={key} className="task">
          <div className="content">
            <span>{task.taskName}</span>
            <span>{task.deadline} days</span>
          </div>
          <Button onClick={() => completeTask(task.taskName)} label="Complete" />
        </div>
      ))}
    </div>
  );
};

export default TodoList;
