import React, { useContext, useEffect, useState } from 'react';
import { TodoContext } from '../context/TodoContext';
import { UserContext } from '../context/UserContext';
import "../style.css"
import AddTodo from '../components/AddTodo';
import TodoList from '../components/TodoList';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

const Todo = () => {
  const { addTodo, updateTodo } = useContext(TodoContext);
  const { currentUser } = useContext(UserContext);
  
  const [title, setTitle] = useState("");
  const [completed, setCompleted] = useState(false);



  const handleSubmit = (e) => {
    e.preventDefault();
    if (title === "") {
      toast.error("Task can't be empty");
    } else {
      addTodo(title, completed);
      setTitle("");
    }
  };

  const handleCompletedChange =(id, completed) => {
    updateTodo(id, {completed})
  }

  if (!currentUser) {
    return (
      <div className='h-[88vh] flex items-center justify-center'>
        <div className="dot-spinner relative flex items-center justify-start h-[2.8rem] w-[2.8rem] ">
          <div className="dot-spinner__dot absolute top-0 left-0 flex items-center justify-start h-full w-full"></div>
          <div className="dot-spinner__dot absolute top-0 left-0 flex items-center justify-start h-full w-full"></div>
          <div className="dot-spinner__dot absolute top-0 left-0 flex items-center justify-start h-full w-full"></div>
          <div className="dot-spinner__dot absolute top-0 left-0 flex items-center justify-start h-full w-full"></div>
          <div className="dot-spinner__dot absolute top-0 left-0 flex items-center justify-start h-full w-full"></div>
          <div className="dot-spinner__dot absolute top-0 left-0 flex items-center justify-start h-full w-full"></div>
          <div className="dot-spinner__dot absolute top-0 left-0 flex items-center justify-start h-full w-full"></div>
          <div className="dot-spinner__dot absolute top-0 left-0 flex items-center justify-start h-full w-full"></div>
        </div>
      </div>


    );
  }

  return (
    <div className="h-[90vh] md:w-[60vw] mx-auto px-4 unscrollable-page  ">
      <div className="p-2   bg-slate-100 h-full">
        <h1 className="text-xl font-bold pt-2 pl-5"> {currentUser.username}</h1>

          <AddTodo handleSubmit={handleSubmit} title={title} setTitle={setTitle} />
          <TodoList handleCompletedChange={handleCompletedChange} />
      </div>
    </div>
  );
};

export default Todo;