// src/Components/base/FormButton/index.tsx

import React from 'react';

type FormButtonProps = {
  type?: 'submit' | 'button' | 'delete';
  variant: 'primary' | 'secondary' | 'success' | 'danger' | 'link';
  buttonName?: string; 
  fontSize?: string;
  onClick?: () => void; // General click handler
  onSubmit?: () => void; // Specific submit handler
  onDelete?: (id: number) => void; // Specific delete handler
  id?: number; // Task ID for delete
};

// ButtonStyles function definition
const ButtonStyles = (variant: string) => {
  switch (variant) {
    case 'primary':
      return 'bg-blue-500 text-white hover:bg-blue-600';
    case 'secondary':
      return 'bg-gray-500 text-white hover:bg-gray-600';
    case 'success':
      return 'bg-green-500 text-white hover:bg-green-600';
    case 'danger':
      return 'bg-red-500 text-white hover:bg-red-600';
    case 'link':
      return 'text-white bg-blue-500 w-44 hover:text-blue-700';
    default:
      return 'bg-transparent border-2 border-gray-500 text-gray-500 hover:bg-gray-500 hover:text-white';
  }
};

const FormButton: React.FC<FormButtonProps> = ({
  type = 'button',
  variant,
  buttonName = 'Click me',
  fontSize = 'text-base',
  onClick,
  onSubmit,
  onDelete,
  id,
}) => {
  const style = `${ButtonStyles(variant)} ${fontSize} rounded-full text-sm px-5 py-2.5 text-center mb-2`;
  
  const handleClick = () => {
    if (type === 'delete' && onDelete && id !== undefined) {
      onDelete(id); // Call onDelete with id if it's a delete button
    } else if (type === 'submit' && onSubmit) {
      onSubmit(); // Call onSubmit if it's a submit button
    } else if (onClick) {
      onClick(); // General click handler for other buttons
    }
  };

  return (
    <button 
      type={type === 'delete' ? 'button' : type} // Prevent default submit behavior for delete
      className={style}
      onClick={handleClick}
    >
      {buttonName}
    </button>
  );
};

export default FormButton;
