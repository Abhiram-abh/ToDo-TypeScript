import React, { useState } from "react";
import FormInput from "../../../components/base/FormInput/index"; 
import FormButton from "../../../components/base/FormButton/index"; 
import { ITask } from "../../../state/TodoStore"; 

interface HomeContainerProps {
  addTask: (task: ITask) => void;
}

const HomeContainer: React.FC<HomeContainerProps> = ({ addTask }) => {
  const [taskName, setTaskName] = useState<string>(""); 
  const [deadline, setDeadline] = useState<number>(0);  // Make sure this is a number

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault(); 
    
    const newTask: ITask = { id: Date.now(), taskName, deadline };
    addTask(newTask); 
    
    setTaskName(""); 
    setDeadline(0); 
  };

  return (
    <div className="main">
      <h1>🧤 My Todo</h1>
      <form className="he" onSubmit={handleAddTask}>
        <FormInput
          type="text"
          placeholder="Task Name"
          text={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />
        <FormInput
          type="number"
          placeholder="Deadline (days)"
          text={deadline.toString()} 
          onChange={(e) => {
            const value = e.target.value;
            setDeadline(value ? Number(value) : 0); // Convert to number
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
