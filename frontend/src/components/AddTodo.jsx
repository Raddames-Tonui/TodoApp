import React  from 'react'

export default function AddTodo({handleSubmit, title, setTitle}) {

  return (
    <div>
        {/* Add Todo */}
        <form className="flex items-center space-x-2  p-4 rounded-lg " onSubmit={handleSubmit}>
          <input 
            type="text" 
            placeholder="Add Task..." 
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="flex-1 px-3 py-2 rounded-lg focus:outline-none focus:ring-1 ring-1 ring-gray-200 focus:ring-[#35ca22]" 
          />
          <button 
            type="submit" 
            className="relative px-6 h-10 rounded-md text-md font-bold border-none overflow-hidden z-10 bg-gradient-to-r from-[#49f544] to-[#f9f047] hover:bg-gradient-to-r hover:from-[#0fd80f] hover:to-[#35ca22] ring-1 ring-gray-600 transition-all duration-500"
            onClick={handleSubmit}
          >
            Add 
          </button>
        </form>
        

    </div>
  )
}
