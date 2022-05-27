import React, { useState, useContext } from "react";
const UserContext = React.createContext();

export function useUser() {
    return useContext(UserContext);
}
export function UserProvider({ children }) {
    const [user, setUser] = useState(localStorage.getItem("user"));
    const updateUser = (newUser) => {
        if (newUser == null) localStorage.removeItem("user")
        else localStorage.setItem("user", newUser)
        setUser(newUser);
    }
    return (
        <UserContext.Provider value={[user, updateUser]}>
            {children}
        </UserContext.Provider>
    );
}
