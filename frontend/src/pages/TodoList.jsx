import React, { useState, useEffect } from 'react';
import TodoForm from './TodoForm';

const TodoList = () => {

 

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">To-Do List</h1>
      <TodoForm />
      <ul className="list-disc pl-5">
        {/* {todos.map((todo, index) => (
          <li key={index} className="flex justify-between items-center mb-2">
            <span>{todo.text}</span>
            <button
              className="ml-4 p-1 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Delete
            </button>
          </li>
        ))} */}
      </ul>
    </div>
  );
};

export default TodoList;
