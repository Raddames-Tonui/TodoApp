import React, { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import TodoList from './TodoList';

function Home() {
  const {currentUser} = useContext(UserContext)

  const capitalizeFirstLetter = (string) => {
    if (!string) return '';
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  
  return (
    <div>
       {/* <div class="w-14 flex flex-row items-center justify-between">
          <div class="w-3 h-3 rounded-full bg-pink-500 transform -translate-y-full animate-wave delay-[0.4s]"></div>
          <div class="w-3 h-3 rounded-full bg-pink-500 transform -translate-y-full animate-wave delay-[0.2s]"></div>
          <div class="w-3 h-3 rounded-full bg-pink-500 transform -translate-y-full animate-wave"></div>
        </div> */}

        <h1 className="text-3xl font-bold text-gray-800">Welcome {capitalizeFirstLetter(currentUser?.username)}</h1>
        <TodoList />


    </div>


  )
}

export default Home