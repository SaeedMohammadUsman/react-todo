// import React from 'react';
import React, { useRef, useEffect } from 'react';

export const InputWithLabel = ({ children, todoTitle, handleTitleChange }) => {
 
const inputRef = useRef(null);
useEffect(()=>{
    inputRef.current.focus();
});

  return (
    <>
     {/* <label htmlFor="todoTitle"> {label}</label> */}
     <label htmlFor='todoTitle'>{children}</label>
     <input value={todoTitle} onChange={handleTitleChange} name="title" type="text" id="todoTitle" 
   //  autoFocus 
    ref={inputRef}
     />
    </>
  );
};
