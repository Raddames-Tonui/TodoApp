import { createContext, useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { server_url } from "../../config.json";

export const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
    const [todos, setTodos] = useState([]);
    const { auth_token } = useContext(UserContext);

    useEffect(() => {
        // Ensure auth_token is available before making a request
        if (!auth_token) return;

        fetch(`${server_url}/todos`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${auth_token}`
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setTodos(data);
            })
            .catch(error => {
                console.error("Error fetching todos:", error);
            });
    }, [auth_token]); 

    const context_data = {
        todos,
        setTodos
    };

    return (
        <TodoContext.Provider value={context_data}>
            {children}
        </TodoContext.Provider>
    );
};
