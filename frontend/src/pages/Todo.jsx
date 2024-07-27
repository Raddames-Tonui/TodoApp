import React, { useContext, useEffect, useState } from 'react';
import { TodoContext } from '../context/TodoContext';
import { UserContext } from '../context/UserContext';
import "../style.css"
import AddTodo from '../components/AddTodo';
import TodoList from '../components/TodoList';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Todo = () => {
  const { addTodo, updateTodo } = useContext(TodoContext);
  const { currentUser } = useContext(UserContext);
  const nav = useNavigate();
  
  const [title, setTitle] = useState("");
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (!currentUser) {
      nav("/users/signin");
    }
  }, [currentUser, nav]);

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
      <div className="flex items-center justify-center h-screen">
        <div className="w-14 flex flex-row items-center justify-between">
          <div className="w-3 h-3 rounded-full bg-green-500 transform -translate-y-full animate-wave delay-[0.4s]"></div>
          <div className="w-3 h-3 rounded-full bg-green-500 transform -translate-y-full animate-wave delay-[0.2s]"></div>
          <div className="w-3 h-3 rounded-full bg-green-500 transform -translate-y-full animate-wave"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-[88vh] md:w-[60vw] mx-auto px-4 unscrollable-page">
      <div className="flex items-center justify-between mx-auto w-full">
        {/* <h1 className="text-xl font-bold mb-4">Welcome {currentUser.username}</h1> */}
      </div>

      <div className="mt-6 rounded-md bg-slate-100">
        <AddTodo handleSubmit={handleSubmit} title={title} setTitle={setTitle} />
        <TodoList handleCompletedChange={handleCompletedChange} />
      </div>
    </div>
  );
};

export default Todo;
