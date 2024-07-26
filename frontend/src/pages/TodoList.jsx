import React, { useContext } from 'react';
import { TodoContext } from '../context/TodoContext';
import { UserContext } from '../context/UserContext';
import icon from '../assets/icon.jpg';

const TodoList = () => {
  const { todos } = useContext(TodoContext);
  const { currentUser } = useContext(UserContext);
  

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
  };

  const handleAddTodo = () =>{

  }
  function handleDelete (){
    const newTodo = tods.filter((todo) => todo.id !==id);

  }

  if (!currentUser) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-14 flex flex-row items-center justify-between">
          <div className="w-3 h-3 rounded-full bg-green-500 transform -translate-y-full animate-wave delay-[0.4s]"></div>
          <div className="w-3 h-3 rounded-full bg-green-500 transform -translate-y-full animate-wave delay-[0.2s]"></div>
          <div className="w-3 h-3 rounded-full bg-green-500 transform -translate-y-full animate-wave"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-[90vh] md:w-[60vw] mx-auto p-4">
      <div className="flex items-center justify-between mx-auto w-full">
        <h1 className="text-xl font-bold mb-4">Welcome {currentUser.username}</h1>
        {/* <img src={currentUser?.avatar} alt="Profile Picture" className="rounded-full" /> */}
      </div>

      <div className="mt-6 rounded-md bg-slate-100">
        {/* Add Todo */}
        <form className="flex items-center space-x-2  p-4 rounded-lg " onSubmit={handleSubmit}>
          <input 
            type="text" 
            placeholder="Add Todo..." 
            className="flex-1 px-3 py-2 rounded-lg focus:outline-none focus:ring-1 ring-1 ring-gray-200 focus:ring-[#35ca22]" 
          />
          <button 
            type="submit" 
            className="relative px-6 h-10 rounded-md text-md font-bold border-none overflow-hidden z-10 bg-gradient-to-r from-[#49f544] to-[#f9f047] hover:bg-gradient-to-r hover:from-[#0fd80f] hover:to-[#35ca22] ring-1 ring-gray-600 transition-all duration-500"
          >
            Add 
          </button>
        </form>
     

          {/* Display Todo */}
          <ul>
  {todos && todos.map((todo) => (
    <React.Fragment key={todo.id}>
      <li>{todo.title}</li>
      <li>{todo.completed ? "Completed" : "Not Completed"}</li>
    </React.Fragment>
  ))}
</ul>

      </div>
    </div>
  );
};

export default TodoList;
