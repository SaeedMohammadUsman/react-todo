
import PropTypes from "prop-types";
import React, { useRef, useEffect } from "react";

const InputWithLabel = ({ id, children, todoTitle, handleTitleChange }) => {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []); // Fixed: Added empty dependency array

  return (
    <>
      <label htmlFor={id}>{children}</label>
      <input
        id={id}
        ref={inputRef}
        value={todoTitle}
        onChange={handleTitleChange}
        name="title"
        type="text"
      />
    </>
  );
};

InputWithLabel.propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  todoTitle: PropTypes.string.isRequired,
  handleTitleChange: PropTypes.func.isRequired,
};

export default InputWithLabel; // Fixed: Exporting correctly
