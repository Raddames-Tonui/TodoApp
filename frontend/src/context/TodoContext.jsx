import { createContext, useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { server_url } from "../../config.json";
import { toast } from "react-hot-toast";

export const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
    const [todos, setTodos] = useState([]);
    const { auth_token } = useContext(UserContext);

    // FETCH TODO
    useEffect(() => {
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
                setTodos(data);
            })
            .catch(error => {
                console.error("Error fetching todos:", error);
            });
    }, [auth_token]);

    const addTodo = (title, completed) => {
        if (!title.trim()) {
            toast.error("Task title cannot be empty");
            return;
        }
    
        fetch(`${server_url}/todos`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${auth_token}`
            },
            body: JSON.stringify({
                title,
                completed
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(newTodo => {
            setTodos(prevTodos => [...prevTodos, newTodo]);
            toast.success("Task added successfully");
        })
        .catch(error => {
            toast.error(`Network error: ${error.message}`);
        });
    };
    
    // UPDATE TODO
    const updateTodo = (id, updatedData) => {
        fetch(`${server_url}/todos/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${auth_token}`
            },
            body: JSON.stringify(updatedData)
        })
        .then(response => response.json())
        .then(updatedTodo => {
            setTodos(prevTodos => 
                prevTodos.map(todo => (todo.id === id ? updatedTodo : todo))
            );
            toast.success("Task updated successfully");
        })
        .catch(error => {
            toast.error("Network error: " + error.message);
        });
    };

    // DELETE TODO
    const deleteTodo = (id) => {
        fetch(`${server_url}/todos/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${auth_token}`
            }
        })
        .then(() => {
            setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
            toast.success("Task deleted successfully");
        })
        .catch(error => {
            toast.error("Network error: " + error.message);
        });
    };

    // console.log(todos)

    const contextData = {
        todos,
        addTodo,
        updateTodo,
        deleteTodo,
    };

    return (
        <TodoContext.Provider value={contextData}>
            {children}
        </TodoContext.Provider>
    );
};
