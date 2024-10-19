import React, { useState } from "react";
import FormInput from "../../Components/FormInput/Index";
import TodoList from "../../Components/TodoList/Index";
import { ITask } from "../../State/TodoStore";
import '../../Style/index.css'

const Homepage: React.FC = () => {
  const [todoList, setTodoList] = useState<ITask[]>([]);

  const addTask = (taskName: string, deadline: number) => {
    const newTask: ITask = { taskName, deadline };
    setTodoList([...todoList, newTask]);
  };

  const completeTask = (taskNameToDelete: string) => {
    setTodoList(todoList.filter((task) => task.taskName !== taskNameToDelete));
  };

  return (
    <div className="homepage">
      <h1>🧤 My Todo</h1>
      <FormInput addTask={addTask} />
      <TodoList todoList={todoList} completeTask={completeTask } />
    </div>
  );
};

export default Homepage;
