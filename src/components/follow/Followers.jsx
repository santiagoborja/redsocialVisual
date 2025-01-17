import React, { useEffect, useState } from 'react';
import { Global } from '../../helpers/Global';
import { useParams } from 'react-router-dom';
import { UserList } from '../user/UserList';
import { GetProfile } from '../../helpers/GetProfile';

export const Followers = () => {

    const [users, setUsers] = useState([]);
    const [following, setFollowing] = useState([]);
    const [loading, setLoading] = useState(true);
    const [more, setMore] = useState(true);
    const [page, setPage] = useState(1);
    const [userProfile, setUserProfile] = useState({});

    const params = useParams();


    useEffect(() => {
        getUsers(1);
        GetProfile(params.userId, setUserProfile);
    }, []);

    const getUsers = async (nextPage = 1) => {
        //Efecto de carga
        setLoading(true);
        //Scar UserId de la Url
        const UserId = params.userId;
        
        //Peticion para sacar usuaior
        const request = await fetch(Global.url + 'follow/followers/' + UserId + "/" + nextPage, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("token")
            }
        });

        const data = await request.json();
        
        let cleanUsers = [];        

        //recorer y limpiar follows para quedarme con followed
        data.follows.docs.forEach(follow => {
            cleanUsers = [...cleanUsers, follow.user]
        });
        data.users = cleanUsers;        

        //Crear yb esati para  listados
        if (data.users && data.status == "success") {
            let newUsers = data.users;

            if (users.length >= 1) {
                newUsers = [...users, ...data.users];
            }

            setUsers(newUsers);
            setFollowing(data.user_following)
            setLoading(false);           

            //Paginacion
            if (users.length >= data.total) {
                setMore(false);
            }            
        }
    }    

    return (
        <>
            <header className="content__header">
                <h1 className="content__title">Usuarios Que Sigue  {userProfile.name+ "  "}{userProfile.surname}</h1>
            </header>

            <UserList users={users}
                getUsers={getUsers}
                following={following}
                setFollowing={setFollowing}
                page={page}
                setPage={setPage}
                more={more}
                loading={loading}
            />
        </>
    )
}
