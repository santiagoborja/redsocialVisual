import React, { useEffect, useState } from 'react';
import avatar from '../../assets/img/user.png';
import { Global } from '../../helpers/Global';
import useAuth from '../../hooks/useAuth';

export const UserList = ({ users, getUsers, following, setFollowing, 
                            page, setPage, more, loading }) => {
    const { auth } = useAuth();


    const nextPage = () => {
        let next = page + 1;
        setPage(next);
        getUsers(next);
    }

    const follow = async (userId) => {
        //Peticion al backend para guardar el follow
        const request = await fetch(Global.url + "follow/save", {
            method: "POST",
            body: JSON.stringify({ followed: userId }),
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("token")
            }
        });

        const data = await request.json();
        //Cuando este todo correcto
        if (data.status == "success") {
            //Actualizar estado de dollowing, agregando el nuevo follow
            setFollowing([...following, userId])

        }
    }


    const unfollow = async (userId) => {
        //Peticion al backend para borrar el follow
        const request = await fetch(Global.url + "follow/unfollow/" + userId, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("token")
            }
        });

        const data = await request.json();

        //Cuando este todo correcto
        if (data.status == "success") {
            //Actualizar estado de following
            //Filtrar los datos para eliminar el antiguo UserId
            //Que acabo de dejar de seguir

            let filterFollowing = following.filter(followingUserId => userId !== followingUserId);
            setFollowing(filterFollowing);
        }

    }

    return (
        <>
            <div className="content__posts">

                {users.map(user => {

                    return (

                        <article className="posts__post" key={user._id}>

                            <div className="post__container">

                                <div className="post__image-user">
                                    <a href="#" className="post__image-link">
                                        {user.image == "default.png" && <img src={avatar} className="post__user-image" alt="Foto de perfil" />}
                                        {user.image != "default.png" && <img src={Global.url + "user/avatar/" + user.image} className="post__user-image" alt="Foto de perfil" />}
                                    </a>
                                </div>

                                <div className="post__body">

                                    <div className="post__user-info">
                                        <a href="#" className="user-info__name">{user.name} {user.surname}</a>
                                        <span className="user-info__divider"> | </span>
                                        <a href="#" className="user-info__create-date">{user.created_at}</a>
                                    </div>

                                    <h4 className="post__content">{user.bio}</h4>

                                </div>

                            </div>

                            {/*Solo se ve botones cuando el usuario no esta logiado*/}
                            {user._id != auth._id &&
                                <div className="post__buttons">

                                    {!following.includes(user._id) &&
                                        <a className="post__button post__button--green"
                                            onClick={() => follow(user._id)}>
                                            Seguir
                                        </a>
                                    }


                                    {following.includes(user._id) &&
                                        <a className="post__button post__button"
                                            onClick={() => unfollow(user._id)}>
                                            Dejar de Seguir
                                        </a>
                                    }

                                </div>
                            }

                        </article>

                    )

                })}

            </div>

            {loading ? <div>Cargando......</div> : ""}

            {more &&

                <div className="content__container-btn">
                    <button className="content__btn-more-post" onClick={nextPage}>
                        Ver mas Personas
                    </button>
                </div>
            }

            <br />

        </>
    )
}
