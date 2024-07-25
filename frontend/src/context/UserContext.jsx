import { useState, createContext, useEffect } from "react";
import { toast } from "react-toastify";
import { server_url } from "../../config.json";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const nav = useNavigate();
    const [currentUser, setCurrentUser] = useState(null);
    const [auth_token, setAuthToken] = useState(() => localStorage.getItem("access_token") || null);

    // REGISTER USER
    const register_user = (username, email, avatar, password) => {
        fetch(`${server_url}/users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                avatar: avatar,
                email: email,
                username: username,
                password: password
            })
        })
        .then((response) => response.json())
        .then((res) => {
            if (res.success) {
                toast.success(res.success);
                nav("/users/signin");
            } else if (res.error) {
                toast.error("User with this email or username already exists");
            } else {
                toast.error("An error occurred");
            }
        })
        .catch((error) => {
            toast.error("Network error: " + error.message);
        });
    };

    // LOGIN USER
    const login_user = (email, password) => {
        fetch(`${server_url}/users/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
        .then((response) => response.json())
        .then((res) => {
            if (res.access_token) {
                localStorage.setItem("access_token", res.access_token);
                setAuthToken(res.access_token); // Update auth_token state
                toast.success(res.success);
                nav("/users/tasks");
            } else if (res.error) {
                toast.error(res.error);
            } else {
                toast.error("An error occurred");
            }
        })
        .catch((error) => {
            toast.error("Network error: " + error.message);
        });
    };

    // Fetch current user
    useEffect(() => {
        if (!auth_token) return; // Skip if auth_token is null

        fetch(`${server_url}/users/current_user`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${auth_token}`
            }
        })
        .then((response) => response.json())
        .then((data) => { 
            // console.log(data.email)
            if (data.email) {
                setCurrentUser(data);
            } else {
                setCurrentUser(null);
            }
        })
        .catch((error) => {
            toast.error("Network error: " + error.message);
        });
    }, [auth_token]);
        // console.log(currentUser)


    const contextData = {
        currentUser,
        setCurrentUser,
        register_user,
        login_user
    };

    return (
        <UserContext.Provider value={contextData}>
            {children}
        </UserContext.Provider>
    );
};
