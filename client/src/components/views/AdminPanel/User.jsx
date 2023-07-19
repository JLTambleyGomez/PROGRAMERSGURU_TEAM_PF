import React, { useEffect, useState } from "react";
import {
    getAllUsersRequest,
    putUserRequest,
    hideUserProfileRequest,
    adminUserRequest,
} from "../../../axiosRequests/axiosRequests";

import { post_user } from "../../../Redux/actions";

import { validateUser } from "./validate";

import styles from "./AdminPanel.module.css";

//_________________________module_________________________
const User = () => {
    //estados locales
    const [allUsers, setAllUsers] = useState([]);
    const [modificarUser, setModificarUser] = useState(false);
    const [newUser, setNewUser] = useState(false);
    const [user, setUser] = useState({
        name: "",
        email: "",
        picture: "",
        nickName: "",
        admin: "",
        banned: "",
        address: "",
    });

    const [userError, setUserError] = useState({
        name: "",
        email: "",
        picture: "",
        nickName: "",
        admin: "",
        banned: "",
        address: "",
    });

    //trae a todos los usuarios con una axion request
    const getUsers = async () => {
        const usersDB = await getAllUsersRequest();
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
        setModificarUser(true);

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

    //abre el formulario
    const handlePostUser = () => {
        setNewUser(true);
    };

    //Cierra el formulario
    const handleCloseForm = () => {
        setNewUser(false);
    };

    const handleInputChange = (event) => {
        const nameInput = event.target.name;
        const valueInput = event.target.value;

        setUser({ ...user, [nameInput]: valueInput });
        setUserError(validateUser({ ...user, [nameInput]: valueInput }));
    };

    const handlePostUserForm = (event) => {
        event.preventDefault();
        setNewUser(false);
    };

    //lice-cycle
    useEffect(() => {
        getUsers();
    }, []);

    return (
        <div className={styles.contain}>
            <h1>Users:</h1>
            {newUser ? (
                <div>
                    <button onClick={handleCloseForm}>X</button>
                    <form>
                        <div>
                            <label htmlFor="name">Nombre:</label>
                            <input
                                name="name"
                                onChange={handleInputChange}
                                value={user.name}
                            />
                            {userError.name && <p>{userError.name}</p>}
                        </div>
                        <div>
                            <label htmlFor="picture">Imagen:</label>
                            <input
                                name="picture"
                                onChange={handleInputChange}
                                value={user.picture}
                            />
                            {userError.picture && <p>{userError.picture}</p>}
                        </div>
                        <div>
                            <label htmlFor="email">Email:</label>
                            <input
                                name="email"
                                onChange={handleInputChange}
                                value={user.email}
                            />
                            {userError.email && <p>{userError.email}</p>}
                        </div>
                        <div>
                            <label htmlFor="nickName">NickName:</label>
                            <input
                                name="nickName"
                                onChange={handleInputChange}
                                value={user.nickName}
                            />
                            {userError.nickName && <p>{userError.nickName}</p>}
                        </div>
                        <div>
                            <label htmlFor="admin">Administrador:</label>
                            <input
                                type="checkbox"
                                name="admin"
                                onChange={handleInputChange}
                                value={user.admin}
                            />
                        </div>
                        <div>
                            <label htmlFor="address">Address:</label>
                            <input
                                name="address"
                                onChange={handleInputChange}
                                value={user.address}
                            />
                            {userError.address && <p>{userError.address}</p>}
                        </div>
                        <button onClick={handlePostUserForm}>Crear</button>
                    </form>
                </div>
            ) : (
                <button onClick={handlePostUser}>Agregar nuevo usuario</button>
            )}
            {modificarUser && (
                <>
                    <div>
                        <form>
                            <label></label>
                        </form>
                    </div>
                </>
            )}
            {allUsers.length &&
                allUsers.map((user, index) => {
                    return (
                        <span key={index}>
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
