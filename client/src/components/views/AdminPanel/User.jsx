import React, { useEffect, useState } from "react";
import {
    getAllUsersRequest,
    putUserRequest,
    hideUserProfileRequest,
    adminUserRequest,
} from "../../../axiosRequests/axiosRequests";

import styles from "./AdminPanel.module.css";

//_________________________module_________________________
const User = () => {
    //estados locales
    const [allUsers, setAllUsers] = useState([]);

    //trae a todos los usuarios con una axion request
    const getUsers = async () => {
        const usersDB = await getAllUsersRequest();
        console.log(usersDB);
        setAllUsers(usersDB);
    };

    //modifica los datos del usuario haciendo una axion request
    const putUser = async (id) => {
        const userModified = await putUserRequest(id);
        getUsers();
    };

    //modifica la propiedad banned del usuario haciendo un axion request
    const hideUserProfileRequest = async (id) => {
        const userBanned = hideUserProfileRequest(id);
        getUsers();
    };

    //cambia el estado del usuario a administrador
    const changeAdminUser = async (id) => {
        const isUserAdmin = adminUserRequest(id);
        getUsers();
    };

    //boton para modificar
    const handleModificar = (event) => {
        const idUser = event.target.value;
        const modificar = event.target.name;

        if (modificar === "datos") {
            console.log(modificar);
            putUser(idUser);
        }

        if (modificar === "administrador") {
            console.log(modificar);
            hideUserProfileRequest(idUser);
        }

        if (modificar === "banear") {
            console.log(modificar);
            changeAdminUser(id);
        }
    };

    //lice-cycle
    useEffect(() => {
        getUsers();
    }, []);

    return (
        <div className={styles.contain}>
            <h1>Users:</h1>
            {allUsers.length &&
                allUsers.map((user, index) => {
                    return (
                        <span>
                            <button
                                onClick={handleModificar}
                                value={user.id}
                                name="datos"
                            >
                                Modificar datos
                            </button>
                            <button
                                onClick={handleModificar}
                                value={user.id}
                                name="administrador"
                            >
                                Hacer Adminitrador
                            </button>
                            <button
                                onClick={handleModificar}
                                value={user.id}
                                name="banear"
                            >
                                Banear
                            </button>
                            <label key={index}>
                                <p>Nombre: {user.name}</p>
                                <p>Email: {user.email}</p>
                                <p>Imagen: {user.picture}</p>
                                <p>Admin: {user.admin}</p>
                                <p>Baneado: {user.banned}</p>
                                <p>
                                    Suscripción:{" "}
                                    {user.expirationDate
                                        ? user.expirationDate
                                        : false}
                                </p>
                                <p>Nickname: {user.nickName}</p>
                            </label>
                        </span>
                    );
                })}
        </div>
    );
};

export default User;
