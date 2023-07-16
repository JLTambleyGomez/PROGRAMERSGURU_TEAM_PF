import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import s from './Profile.module.css'
import { get_User_By_Email } from "../../../Redux/actions";
import { NavLink } from "react-router-dom";

//_________________________module_________________________
function Profile () {
    //global states:
    const user = useSelector((state)=>state.user)
    console.log(user);
    
    //const:
    const time = Date.now()
    
    //component:
    return (
        <div className={s.profile}>

            <div className={s.main}>
                <div>
                {user?.picture?(<img className={s.image} src={user.picture}/>): (<img className={s.image} src={"https://www.prensalibre.com/wp-content/uploads/2019/05/1467646262_522853_1467646344_noticia_normal.jpg?quality=82&w=664"}/>) }
                </div>
                <div className={ s.name }>
                    <h1>Bienvenido {user.nickName}!</h1>
                </div>
            </div>

            <div >
                <p>nombre:  {user.name}</p>
                <p>Correo:  {user.email}</p>
                <h3>Fecha de expiracion: {user.expirationDate}</h3>
                <ul>
                <h2>Favoritos:</h2>
                {user.favorites?.map((fav,index)=>(<li  key={index}><NavLink to={`/CourseDetails/${fav.id}`}><h4>{fav.name}</h4></NavLink></li>))}
                </ul>

                <ul>
                <h2>Comentarios destacados:</h2>
                {user.comments?.map((com, index)=>(<li key={index}><h4>{com.comentario}</h4></li>))}
                </ul>
                <h4>Language: {user.language}</h4>
                {
                    user.isBanned === true ? (
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