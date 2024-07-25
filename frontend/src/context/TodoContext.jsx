import { createContext, useState } from "react";

export const TodoContext = createContext()

export const TodoProvider = ({children}) => {
    const [todo, setTodos] = useState([])

    const todos = () => {
        fetch(`${server_url}/todos`, {
            method: "GET",
            
        })
    }


    const contextData = {
        todo,
        setTodos
    }
    return (
        <TodoContext.Provider value={contextData}>{children}</TodoContext.Provider>
    )
}