import React from "react";

interface ButtonProps {
  onClick: () => void;
  label: string;
}

const Button: React.FC<ButtonProps> = ({ onClick, label }) => {
  return (
    <button onClick={onClick} className="custom-button">
      {label}
    </button>
  );
};

export default Button;
