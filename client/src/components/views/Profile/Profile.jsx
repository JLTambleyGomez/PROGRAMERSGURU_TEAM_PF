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

    //life-cycles:
        useEffect(() => {
        dispatch(get_User_By_Email(sessionStorage.getItem("email")))
        dispatch(get_comments_by_user(user.id))   
        console.log(user)
    }, [])

    //component:
    return (
        <div className={s.profile}>

            <div className={s.main}>
                <div>
                <img className={s.image} src={user.picture}/>
                </div>
                <div className={ s.name }>
                    <h1>Bienvenido {user.nickName ? user.nickName : "Invitado"}!</h1>
                </div>
            </div>

            <div >
                <h1>Nombre:  {user.name}</h1>
                <h3>Correo:  {user.email}</h3>
                <h4>{ 
                        user.expirationDate ?
                            actualDate > expirationDate 
                            ? "No posee suscripción activa" 
                            : `Su suscripción vence en ${(expirationDate - actualDate) / (1000 * 60 * 60 * 24)} días`
                        : "Regístrese y adquiera una suscripción"
                    }
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
                <h3>
                    {
                        user.nickName ?
                            user.isBanned ? 
                            "Esta cuenta NO está activa"
                            :
                            "Esta cuenta está activa"
                        : "Regístrese para activar su cuenta"
                    }
                </h3>
                <button>
                    {
                        user.nickName ? 
                        "Desactivar tu cuenta"
                        : "Regístrese"
                    }        
                </button>
            </div>
        </div>
    )
}

export default Profile;