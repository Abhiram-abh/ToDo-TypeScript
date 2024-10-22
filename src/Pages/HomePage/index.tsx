// src/pages/HomePage/index.tsx
import React, { useState } from "react";
import HomeContainer from "../../Components/containers/HomeContainer"; // Ensure correct import
import TodoList from "../../Components/TodoList"; // Adjust this import path
import { ITask } from "../../State/TodoStore"; // Ensure this import path is correct

const HomePage: React.FC = () => {
  const [todos, setTodos] = useState<ITask[]>([]);

  // Log the todos
  console.log("Current todos:", todos);

  const addTask = (newTask: Omit<ITask, 'id'>) => {
    const taskWithId = { ...newTask, id: Date.now() };
    setTodos([...todos, taskWithId]);
    console.log("Added task:", taskWithId);
  };

  const completeTask = (taskIdToDelete: number) => {
    setTodos(todos.filter((task) => task.id !== taskIdToDelete));
    console.log("Completed task ID:", taskIdToDelete);
  };

  return (
    <div>
      <HomeContainer addTask={addTask} />
      {todos.length === 0 ? (
        <p className="task-msg">No tasks available. Please add some tasks!</p>
      ) : (
        <TodoList todoList={todos} completeTask={completeTask} />
      )}
    </div>
  );
};

export default HomePage; // Ensure this line is included
