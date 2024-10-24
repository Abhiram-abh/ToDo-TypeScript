import React, { useState } from "react";
import HomeContainer from "../../components/containers/HomeContainer"; 
import TodoList from "../../components/TodoList";   
import { ITask } from "../../state/TodoStore";    

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
