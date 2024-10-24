import React from "react";
import ListItem from "../ListItem"; 
import { ITask } from "../../../state/TodoStore"; 

interface TodoListProps {
  todoList: ITask[]; 
  completeTask: (taskIdToDelete: number) => void; 
}

const TodoList: React.FC<TodoListProps> = ({ todoList, completeTask }) => {
  return (
    <div>
      <ListItem todoList={todoList} completeTask={completeTask} />
    </div>
  );
};

export default TodoList;
