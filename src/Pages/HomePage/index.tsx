// src/pages/HomePage/index.tsx
import React, { useState, useEffect } from 'react';
import { createTodo, getTodos, deleteTodo } from '../../service/TodoService';
import { ITask } from '../../state/TodoStore';

const HomePage: React.FC = () => {
  const [todos, setTodos] = useState<ITask[]>([]);
  const [taskName, setTaskName] = useState('');
  const [deadline, setDeadline] = useState<number>(Date.now()); // Default to now

  // Fetch todos when the component mounts
  useEffect(() => {
    const fetchTodos = async () => {
      const fetchedTodos = await getTodos();
      setTodos(fetchedTodos);
    };
    fetchTodos();
  }, []);

  const addTodo = async () => {
    if (!taskName) return; // Prevent adding empty tasks
    const newTask: Omit<ITask, 'id'> = { taskName, deadline };
    const createdTask = await createTodo(newTask);
    setTodos((prev) => [...prev, createdTask]);
    setTaskName(''); // Clear input after adding
  };

  const completeTask = async (taskId: number) => {
    await deleteTodo(taskId);
    setTodos((prev) => prev.filter((task) => task.id !== taskId)); // Update state
  };

  return (
    <div>
      <h1>Todo List</h1>
      <input
        type="text"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        placeholder="Task Name"
      />
      <input
        type="number"
        value={deadline}
        onChange={(e) => setDeadline(Number(e.target.value))}
        placeholder="Deadline (timestamp)"
      />
      <button onClick={addTodo}>Add Todo</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.taskName} - {todo.deadline}
            <button onClick={() => completeTask(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
