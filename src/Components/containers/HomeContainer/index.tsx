import React, { useState } from "react";
import FormInput from "../../base/FormInput"; // Ensure this import path is correct
import FormButton from "../../base/FormButton"; // Ensure this import path is correct
import { ITask } from "../../../State/TodoStore"; // Ensure this import path is correct

interface HomeContainerProps {
  addTask: (task: ITask) => void;
}

const HomeContainer: React.FC<HomeContainerProps> = ({ addTask }) => {
  const [taskName, setTaskName] = useState<string>(""); // Ensure taskName is a string
  const [deadline, setDeadline] = useState<number>(0);  // Ensure deadline is a number

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent form submission from reloading the page
    
    const newTask: ITask = { id: Date.now(), taskName, deadline };
    addTask(newTask); // Call the addTask function passed as a prop
    
    setTaskName(""); // Reset task name
    setDeadline(0);  // Reset deadline
  };

  return (
    <div className="main">
      <h1>🧤 My Todo</h1>
      <form className="he" onSubmit={handleAddTask}>
        <FormInput
          type="text"
          placeholder="Task Name"
          text={taskName}
          onChange={(e) => setTaskName(e.target.value)} // Capture task name
        />
        <FormInput
          type="number"
          placeholder="Deadline (days)"
          text={deadline.toString()} // Convert deadline to string for input
          onChange={(e) => {
            const value = e.target.value;
            setDeadline(value ? Number(value) : 0); // Convert to number, or fallback to 0
          }}
        />
        <FormButton
          type="submit"
          variant="primary"
          buttonName="Add Task"
          fontSize="text-lg"
        />
      </form>
    </div>
  );
};

export default HomeContainer;
