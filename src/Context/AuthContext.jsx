import { createContext, useState } from "react";

export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
    const [isLogin, setIslogin] = useState(
        localStorage.getItem("loginToken") !== null,
    );

    const [role, setRole] = useState(
        localStorage.getItem('role') || null
    )

    return <AuthContext.Provider value={{ isLogin, setIslogin, role, setRole }}>
        {children}
    </AuthContext.Provider>
}