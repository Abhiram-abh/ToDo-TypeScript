import React, { ChangeEvent, useState } from "react";
import Button from "../Button";

interface FormInputProps {
  addTask: (taskName: string, deadline: number) => void;
}

const FormInput: React.FC<FormInputProps> = ({ addTask }) => {
  const [task, setTask] = useState<string>("");
  const [deadline, setDeadline] = useState<number>(0);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    if (name === "task") {
      setTask(value);
    } else if (name === "deadline") {
      setDeadline(Number(value));
    }
  };

  const handleSubmit = (): void => {
    addTask(task, deadline);
    setTask("");
    setDeadline(0);
  };

  return (
    <div className="inputContainer"> {/* Flex container */}
      <input
        type="text"
        placeholder="Task..."
        name="task"
        value={task}
        onChange={handleChange}
      />
      <input className="input"
        type="number"
        placeholder="Deadline (in Days)..."
        name="deadline"
        value={deadline}
        onChange={handleChange}
      />
      <Button onClick={handleSubmit} label="Add Task" />
    </div>
  );
};

export default FormInput;
