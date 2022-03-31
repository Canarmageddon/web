import React, { useContext, useState } from "react";
const UserContext = React.createContext();

export function useTravel() {
    return useContext(UserContext);
}
export function UserProvider({ children }) {
    const [user, setUser] = useState(null);
    return (
        <UserContext.Provider value={[user, setUser]}>
            {children}
        </UserContext.Provider>
    );
}
