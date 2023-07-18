import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { get_comments_by_user, get_User_By_Email } from "../../../Redux/actions";

import s from './Profile.module.css'


//_________________________module_________________________
function Profile () {

    //global states:
    const user = useSelector((state) => state.user)
    const userComments = useSelector((state) => state.userComments)

    //const:
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const expirationDate = new Date(user?.expirationDate)
    const actualDate = new Date()

    //life-cycles:
    useEffect(() => {
        const token= localStorage.getItem("email")
        if (!token) navigate("/IniciaSession");
    }, [])

    const email = localStorage.getItem("email")

    useEffect(() => {
        console.log('hola')
        if (!user) {
            dispatch(get_User_By_Email(email))
            dispatch(get_comments_by_user(user?.id))
        }
    }, [dispatch])


    //component:
    return (
        <main className={s.profile}>

        {/* BIENVENIDA Y FOTO */}
            <div className={s.main}>
                <div>
                    <img className={s.image} src={user?.picture}/>
                </div>
                <div className={ s.name }>
                    <h1>Bienvenido {user?.nickName}!</h1>
                </div>
            </div>

        {/* DATOS */}
            {user?.name ? (
                <div><h1>Nombre:  {user?.name}</h1>
                    <h3>Correo:  {user?.email}</h3>
                    <h4>{actualDate > expirationDate 
                        ? "No posee suscripción activa" 
                        : `Su suscripción vence en ${(expirationDate - actualDate) / (1000 * 60 * 60 * 24)} días`}
                    </h4>
                    <ul>
                        <h2>Favoritos:</h2>
                        <p>Próximamente</p>
                    </ul>

                {/* ACTIVIDAD / COMENTARIOS */}
                    <ul>
                        <h2>Comentarios destacados:</h2>
                        {
                            !userComments?.length 
                            ? "Todavía no hiciste ningún comentario!"
                            : userComments?.map(({ date, message, rating }, index) => {
                                return (
                                    <li key={index}>
                                        <h5>Fecha: {date}</h5>
                                        <h4>Mensaje: {message}</h4>
                                    </li>
                                )
                            })
                        }
                    </ul>
                    {/* <h4>Language: {user.language}</h4> */}

                {/* ESTADO */}
                    {
                        user?.isBanned ? (
                            <h3>Este cuenta NO está activa</h3>
                        ) : (
                            <h3>Este cuenta está activa</h3>
                        )
                    }

                {/* BOTON */}
                    <button>Desactivar tu cuenta</button>
                </div> ) : ""
            }
        </main>
    )
}

export default Profile;