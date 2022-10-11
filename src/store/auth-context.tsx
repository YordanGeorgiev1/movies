import React, { useEffect, useState } from 'react'
import AuthInterface, { Props } from '../interfaces/models';

const AuthContext = React.createContext<AuthInterface>({
    token: '',
    isLoggedIn: false,
    login: (token: string) => {},
    logout: () => {}
});

export const AuthContextProvider = ({children}: Props) => {
    const [token, setToken] = useState<string | null>(null);
    const [userIsLoggedIn, setUserIsLoggedIn] = useState(false);
    
    useEffect(() => {
        const storedUserLoggedInInformation = localStorage.getItem('Idtoken');
        if (storedUserLoggedInInformation) {
            setUserIsLoggedIn(true);
            setToken(storedUserLoggedInInformation);
        }
    }, []);
    
    const loginHandler = (token: string) => {
        setToken(token);
        localStorage.setItem('Idtoken', token);
        setUserIsLoggedIn(true);
    };

    const logoutHandler = () => {
        localStorage.removeItem('Idtoken');
        setToken(null);
        setUserIsLoggedIn(false);
    };

    const contextValue: AuthInterface = {
        token: token,
        isLoggedIn: userIsLoggedIn,
        login: loginHandler,
        logout: logoutHandler
    };

    return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
};

export default AuthContext;