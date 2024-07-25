import { useState, createContext, useEffect } from "react";
import { toast } from "react-toastify";
import { server_url } from "../../config.json";


export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState("Raddames");
    
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

    const contextData = {
        currentUser,
        setCurrentUser,
        register_user
    };

    return (
        <UserContext.Provider value={contextData}>
            {children}
        </UserContext.Provider>
    );
};
