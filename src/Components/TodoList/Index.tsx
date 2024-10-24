import React from "react";
import { ITask } from "../../state/TodoStore"; 
import FormButton from "../../components/base/FormButton/index"; 

interface TodoListProps {
  todoList: ITask[];
  completeTask: (taskId: number) => void; 
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
            type="delete" 
            variant="danger" 
            buttonName="Delete" 
            onDelete={completeTask} 
            id={task.id} 
          />
        </div>
      ))}
    </div>
  );
};

export default TodoList;
