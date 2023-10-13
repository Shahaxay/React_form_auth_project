import React, { useState, useEffect } from "react";

const AuthContext = React.createContext({
    isLoggedIn: false,
    onLogout: () => { },
    onLogin:()=>{}
});

export const AuthContextProvider = props => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const token = localStorage.getItem('userAuthToken');

    //controlling effect/side effect
    useEffect(() => {
        if (token) {
            setIsLoggedIn(+token);
        }
    }, []);

    const loginHandler = (email, password, college) => {
        localStorage.setItem('userAuthToken', '1');
        setIsLoggedIn(true);
    };

    const logoutHandler = () => {
        localStorage.setItem('userAuthToken', '0');
        setIsLoggedIn(false);
    };
    return (
        <AuthContext.Provider value={{isLoggedIn:isLoggedIn,onLogout:logoutHandler,onLogin:loginHandler}}>
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthContext;