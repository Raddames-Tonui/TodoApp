import React, { useContext } from 'react';
import { TodoContext } from '../context/TodoContext';
import { MdDeleteSweep } from "react-icons/md";
import { UserContext } from '../context/UserContext';
import "../style.css";

function TodoList({ handleCompletedChange }) {
  const { todos, deleteTodo } = useContext(TodoContext);
  const { currentUser } = useContext(UserContext);

  const convertToKenyaDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-KE', {
      timeZone: 'Africa/Nairobi',
      weekday: 'short',
      month: 'short',
      day: '2-digit'
    });
  };

  return (
    <div className="h-[70vh] w-full" style={{ backgroundImage: `url(${currentUser?.avatar})`, backgroundSize: 'cover', backgroundPosition: 'top' }}>
      {/* Display Todo */}
      <ul className="p-4 sm:p-6 md:p-8 space-y-4 overflow-y-scroll h-full no-scrollbar bg-white bg-opacity-85">
        {todos && todos.map(todo => (
          <li key={todo.id} className="p-2 border-b border-gray-200">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 items-center justify-between">
              <div className='flex justify-start'>
                <span className="text-sm sm:text-base md:text-lg">{todo.title}</span>
              </div>
              <div className='flex justify-center'>
                <span className="text-xs sm:text-sm md:text-base">{convertToKenyaDate(todo.created)}</span>
              </div>
              <div className='flex items-center justify-center'>
                <label htmlFor={`done-${todo.id}`} className="pr-2 text-xs sm:text-sm md:text-base">Completed</label>
                <input
                  id={`done-${todo.id}`}
                  type="checkbox"
                  checked={todo.completed}
                  className="form-checkbox h-4 w-4 text-green-600"
                  onChange={() => handleCompletedChange(todo.id, !todo.completed)}
                />
              </div>
              <div className='flex justify-center'>
                <MdDeleteSweep className='h-6 w-6 text-red-600 md:h-7 md:w-7' onClick={() => deleteTodo(todo.id)} />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
