import React, { useState, useContext, useEffect } from "react";
const UserContext = React.createContext();

export function useUser() {
    return useContext(UserContext);
}
export function UserProvider({ children }) {
    const [user, setUser] = useState(null);
    const updateUser = (newUser) => {
        setUser(newUser);
    }
    useEffect(async () => {

        //const whoAmI = await
        //  setUser(whoami.user)

    }, [])

    return (
        <UserContext.Provider value={[user, updateUser]}>
            {children}
        </UserContext.Provider>
    );
}
