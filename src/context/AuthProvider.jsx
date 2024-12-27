import React, { useState, useEffect, createContext } from 'react';
import { Global } from '../helpers/Global';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [auth, setAuth] = useState({});

    useEffect(() => {
        authUser();
    }, []);

    const authUser = async () => {
        //Sacar datos del usuario identificado del localStorage
        const token = localStorage.getItem("token");
        const user = localStorage.getItem("user");

        //Comprobar si tengo el token y el user
        if (!token || !user) {
            return false;
        }

        //Tranformar los a un onjeto javascript
        const userObj = JSON.parse(user);
        const userId = userObj.id;

        //Peticion ajax al backend que compruebe el token y que me devulva todo los datos del usuario
        const request = await fetch(Global.url + "user/profile/" + userId,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token
                }
            }
        );

        const data = await request.json();

        //Setear elestado auth
        setAuth(data.user);
    }

    return (<AuthContext.Provider
        value={{
            auth,
            setAuth
        }}>
        {children}
    </AuthContext.Provider>
    )
}


export default AuthContext;