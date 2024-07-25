import { useState, createContext, useEffect } from "react";
// import { toast } from "react-toastify";
import toast from 'react-hot-toast';

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


    // UPDATE USER
    const update_user = (username, avatar, password) => {
      const updatePromise = fetch(`${server_url}/users`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${auth_token}`
        },
        body: JSON.stringify({
          username: username,
          avatar: avatar,
          password: password
        })
      })
      .then((response) => response.json())
      .then(({ success, error }) => {
        if (success) {
          return success; 
        } else if (error) {
          throw new Error(error); 
        }
      })
      .catch((error) => {
        throw new Error("Network error: " + error.message); 
      });
    
      // Use toast.promise to handle different states of the promise
      toast.promise(updatePromise, {
        loading: 'Saving...',
        success: <b>Settings saved!</b>,
        error: (error) => <b>{error.message || 'Could not save.'}</b>,
      })
      .then(() => {
        nav("/users/tasks"); 
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
                setAuthToken(res.access_token); 
                toast.success('logged in', {
                    icon: '👏',
                  });
                    nav("/users/tasks");
            } else if (res.message) {
                toast.error(res.message);
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

    // LOGOUT USER
    const logout_user = () =>{
        fetch(`${server_url}/users/logout`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${auth_token}`
            }
        })
        .then((response) => response.json())
        .then((res) => {
            if (res.success){
                localStorage.removeItem("access_token");
                setAuthToken(null);
                setCurrentUser(null);
                toast.success(res.success);
                nav("/users/signin");
            } else {
                toast.error(res.error);
            }
        })
    }


    const contextData = {
        currentUser,
        setCurrentUser,
        register_user,
        login_user,
        update_user,
        logout_user
    };

    return (
        <UserContext.Provider value={contextData}>
            {children}
        </UserContext.Provider>
    );
};
