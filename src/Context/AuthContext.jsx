import { createContext, useState } from "react";

export const AuthContext = createContext();

export default function AuthContextProvider({children})
{
    const [isLogin, setIslogin] = useState(
    localStorage.getItem("loginToken") != null,
    );

    return <AuthContext.Provider value={{isLogin,setIslogin}}>
        {children}
    </AuthContext.Provider>
}