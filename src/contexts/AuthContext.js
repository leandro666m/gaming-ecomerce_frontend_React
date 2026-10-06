import { createContext, useEffect, useState } from "react";
import { getMe, LoginApi, LogoutApi } from "@/api";


export const AuthContext = createContext()


export const AuthProvider = ( { children } ) => {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getMe()
            .then(setUser)
            .catch(() => setUser(null))
            .finally(() => setLoading(false));
    }, [])
    
    const login = async (credentials) => {
        await LoginApi(credentials);
        const currentUser = await getMe();
        setUser(currentUser);
        return currentUser;
    }

    const logout = async () => {
        try {
            await LogoutApi();
        } finally {
            setUser(null);
        }
    }

    const updateUser = (key, value) => {
        setUser( { ...user, [key]: value } )
    }   



    const data = {
        user,
        login,
        logout,
        updateUser
    };

 
    if(loading) return  null;


    
    return (
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    )
}