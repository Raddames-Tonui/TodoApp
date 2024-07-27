import React, { useContext } from 'react';
import { TodoContext } from '../context/TodoContext';
import { MdDeleteSweep } from "react-icons/md";
import { UserContext } from '../context/UserContext';
import "../style.css"

function TodoList() {
  const { todos, deleteTodo } = useContext(TodoContext);
  const { currentUser } = useContext(UserContext);

  const convertToKenyaDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-KE', {
      timeZone: 'Africa/Nairobi',
      weekday: 'short', // 'long' for full weekday name
      month: 'short',   // 'long' for full month name
      day: '2-digit'    // ensures the day is always two digits
    });
  };

  return (
    <div className="h-[70vh] w-full" style={{ backgroundImage: `url(${currentUser?.avatar})`, backgroundSize: 'cover', backgroundPosition: 'top' }}>
      {/* Display Todo */}
      <ul className="p-8 space-y-4 overflow-y-scroll h-full no-scrollbar bg-white bg-opacity-85">
        {todos && todos.map(todo => (
          <li key={todo.id} className="p-2 border-b border-gray-200">
            <div className="grid grid-cols-4 items-center justify-between space-x-2">
              <div className='flex justify-start'>
                <span>{todo.title}</span>
              </div>
              <div className='flex justify-center'>
                <span>{convertToKenyaDate(todo.created)}</span>
              </div>
              <div className='flex items-center justify-center'>
                <label htmlFor="done" className="pr-2">Completed</label>
                <input
                  id="done"
                  type="checkbox"
                  checked={todo.completed}
                  readOnly
                  className="form-checkbox h-4 w-4 text-green-600"
                />
              </div>
              <div className='flex justify-center'>
                <MdDeleteSweep className='h-7 w-7 text-red-600' onClick={() => deleteTodo(todo.id)} />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
