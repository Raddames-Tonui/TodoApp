import React, { useState } from 'react';

const TodoForm = () => {


  return (
    <form  className="flex space-x-4 mb-6">
      <input
        type="text"
      
        className="flex-1 p-2 border border-gray-300 rounded"
        placeholder="Enter a new todo"
      />
      <button
        type="submit"
        className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Add
      </button>
    </form>
  );
};

export default TodoForm;
