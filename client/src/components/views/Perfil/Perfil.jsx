import { useState } from "react";

import './Perfil.css'

//__________________________________
const Perfil = () => {

    const [settings, setSettings] = useState({
        details: true
    })
        // details: true,
        // courses: false,
        // socialActivity: false,
        // privacyAndSecurity: false,
        // payments: false,
        // support: false,
        // termsAndConditions: false


    return (
        <div className = "perfilContainer">
            <div className = "optionSection" >
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
                        <h1>DETAILS</h1>
                    </div>
                )
            }
            {
                settings.courses && (
                    <div className = 'detailsContainer'>
                        <h1>COURSES</h1>
                    </div>
                )
            }
            {
                settings.socialActivity && (
                    <div className = 'detailsContainer'>
                        <h1>COMMENTS</h1>
                    </div>
                )
            }
            {
                settings.privacyAndSecurity && (
                    <div className = 'detailsContainer'>
                        <h1>PRIVACY CHECK, SECURITY SETTINGS</h1>
                    </div>
                )
            }
            {
                settings.payments && (
                    <div className = 'detailsContainer'>
                        <h1>PAYMENT METHODS</h1>
                    </div>
                )
            }
            {
                settings.support && (
                    <div className = 'detailsContainer'>
                        <h1>CONTACT SUPPORT</h1>
                    </div>
                )
            }
            {
                settings.termsAndConditions && (
                    <div className = 'detailsContainer'>
                        <h1>TERMS AND CONDITIONS</h1>
                    </div>
                )
            }
        </div>
    )
}

export default Perfil;