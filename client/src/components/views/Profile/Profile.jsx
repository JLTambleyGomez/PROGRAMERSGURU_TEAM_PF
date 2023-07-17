import { useDispatch, useSelector } from "react-redux";
import s from './Profile.module.css'
import { get_comments_by_user, get_User_By_Email } from "../../../Redux/actions";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

//_________________________module_________________________
function Profile () {
    //global states:
    const user = useSelector((state)=>state.user)
    const userComments = useSelector((state)=>state.userComments)
    
    //const:
    const expirationDate = new Date(user.expirationDate)
    const actualDate = new Date()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(get_User_By_Email(sessionStorage.getItem("email")))
        dispatch(get_comments_by_user(user.id))   
    }, [])

    //component:
    return (
        <div className={s.profile}>

            <div className={s.main}>
                <div>
                <img className={s.image} src={user.picture}/>
                </div>
                <div className={ s.name }>
                    <h1>Bienvenido {user.nickName}!</h1>
                </div>
            </div>

            <div >
                <h1>Nombre:  {user.name}</h1>
                <h3>Correo:  {user.email}</h3>
                <h4>{actualDate > expirationDate 
                    ? "No posee suscripción activa" 
                    : `Su suscripción vence en ${(expirationDate - actualDate) / (1000 * 60 * 60 * 24)} días`}
                </h4>
                <ul>
                <h2>Favoritos:</h2>
                <p>Próximamente</p>
                </ul>

                <ul>
                <h2>Comentarios destacados:</h2>
                {!userComments.length 
                    ? "Todavía no hiciste ningún comentario!"
                    : userComments.map(({date, message, rating}, index) => {
                        return (
                            <li key={index}>
                                <h5>Fecha: {date}</h5>
                                <h4>Mensaje: {message}</h4>
                            </li>
                    )})}
                </ul>
                {/* <h4>Language: {user.language}</h4> */}
                {
                    user.isBanned ? (
                        <h3>Este cuenta NO está activa</h3>
                    ) : (
                        <h3>Este cuenta está activa</h3>
                    )
                }
                <button>Desactivar tu cuenta</button>
            </div>
        </div>
    )
}

export default Profile;