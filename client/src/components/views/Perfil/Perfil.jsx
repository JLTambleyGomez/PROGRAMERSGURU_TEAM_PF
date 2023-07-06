import { useState } from "react";

import './Perfil.css'


//_________________________module_________________________
function Perfil () {

    //const:
    const user = {
        details:"my name is jeff",
        image:"https://media.giphy.com/media/SoVo8Rl5GeA4E/giphy.gif",
        courses:["de obo","que es obo?", "( ͡° ͜ʖ ͡°)"],
        socialActivity:"...[sonidos de grillo*]",
        privacyAndSecurity:"doxeado papu",
        payments:"tu ere povre, tuno tene aifon",
        support:"mercy",
        termsAndConditions:"albion online es un mmorpg no lineal en el que escribes tu propia historia sin limitarte a seguir un camino prefijado, explora un amplio mundo abierto con cinco biomas unicos, todo cuanto hagas tendra su repercusíon en el mundo, con su economia orientada al jugador de albion los jugadores crean practicamente todo el equipo a partir de los recursos que consiguen, el equipo que llevas define quien eres, cambia de arma y armadura para pasar de caballero a mago o juego como una mezcla de ambas clases, aventurate en el mundo abierto y haz frente a los habitantes y las criaturas de albion, inicia expediciones o adentrate en mazmorras en las que encontraras enemigos aun mas dificiles, enfrentate a otros jugadores en encuentros en el mundo abierto, lucha por los territorios o por ciudades enteras en batallas tacticas, relajate en tu isla privada donde podras construir un hogar, cultivar cosechas, criar animales, unete a un gremio, todo es mejor cuando se trabaja en grupo [musica] adentrate ya en el mundo de albion y escribe tu propia historia."
    }

    //states:
    const [settings, setSettings] = useState({
        details: true
    })


    return (
        <div>
        <img src={user.image} className="imagen"/>
        <div className = "perfilContainer">

            <div className = "optionSection" >
                <label name = 'image' onClick = {() => {setSettings({image: true})}}>Account image</label>
                <label name = 'details' onClick = {() => {setSettings({details: true})}}>Account Details</label>
                <label name = 'courses' onClick = {() => {setSettings({courses: true})}}>Your path</label>
                <label name = 'socialActivity' onClick = {() => {setSettings({socialActivity: true})}}>Social activiy</label>
                <label name = 'privacyAndSecurity' onClick = {() => {setSettings({privacyAndSecurity: true})}}>Privacy and security</label>
                <label name = 'payments' onClick = {() => {setSettings({payments: true})}}>Payments</label>
                <label name = 'support' onClick = {() => {setSettings({support: true})}}>Support</label>
                <label name = 'termsAndConditions' onClick = {() => {setSettings({termsAndConditions: true})}}>Terms and conditions</label>
            </div>
            {
                settings.details && (
                    <div className = 'detailsContainer'>
                        <h1>{user.details}</h1>
                        <img src={user.image}/>
                    </div>
                )
            }
             {
                settings.image && (
                    <div className = 'detailsContainer'>
                        <img src={user.image}/>
                    </div>
                )
            }
            {
                settings.courses && (
                    <div className = 'detailsContainer'>
                        <ul>{user.courses?.map((C)=>{
                            return(
                                <li>{C}</li>
                            )
                        })}</ul>
                    </div>
                )
            }
            {
                settings.socialActivity && (
                    <div className = 'detailsContainer'>
                        <h1>{user.socialActivity}</h1>
                    </div>
                )
            }
            {
                settings.privacyAndSecurity && (
                    <div className = 'detailsContainer'>
                        <h1>{user.privacyAndSecurity}</h1>
                    </div>
                )
            }
            {
                settings.payments && (
                    <div className = 'detailsContainer'>
                        <h1>{user.payments}</h1>
                    </div>
                )
            }
            {
                settings.support && (
                    <div className = 'detailsContainer'>
                        <h1>{user.support}</h1>
                    </div>
                )
            }
            {
                settings.termsAndConditions && (
                    <div className = 'detailsContainer'>
                        <h1>{user.termsAndConditions}</h1>
                    </div>
                )
            }
        </div>
        </div>
    )
}

export default Perfil;