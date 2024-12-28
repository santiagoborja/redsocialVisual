import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuth from '../../hooks/useAuth';

export const Logout = () => {

    const {setAuth, setCounters} = useAuth();
    const navigate = useNavigate();

    useEffect(()=>{
        //Vaciar el localstorage
        localStorage.clear();

        //Setera estados globlaes vacios
        setAuth({});
        setCounters({});        

        //Navigate al login
        navigate("/login");
    })

  return (
    <h1>Cerradno sesion.....</h1>
  )
}
