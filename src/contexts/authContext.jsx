import { createContext, useState } from "react";
import PropTypes from 'prop-types';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [isLogin, setIsLogin] = useState(Boolean( localStorage.getItem( "isLogin" ) ) );
    const [user, setUser] = useState(null);

    const login = (values) => {
        setUser(values)
        setIsLogin(true);
        localStorage.setItem('isLogin', 1)
    }

    const state = { isLogin, user, login };

    return (
        <AuthContext.Provider value={state}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node,
};

export default AuthProvider;