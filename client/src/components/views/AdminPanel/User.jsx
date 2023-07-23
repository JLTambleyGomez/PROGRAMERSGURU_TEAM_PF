import { useEffect, useState } from "react";
import {
    getAllUsersRequest,
    putUserRequest,
    hideUserProfileRequest,
    makeAdminUser,
    postUserRequest
} from "../../../axiosRequests/axiosRequests";
import { useSelector, useDispatch } from "react-redux";

import { post_user } from "../../../Redux/actions";

import { validateUser } from "./validate";

import styles from "./AdminPanel.module.css";   

//_________________________module_________________________
const User = () => {
    //estados globales

    //hooks
    const dispatch = useDispatch();
    //estados locales
    const [allUsers, setAllUsers] = useState([]);
    const [messagePost, setMessagePost] = useState("");
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

    //modifica la propiedad banned del usuario haciendo un axion request
    const hide_user = async (email) => {
        console.log(email);
        const userBanned = await hideUserProfileRequest(email);
        console.log(userBanned.message);
        return getUsers();
    };

    //cambia el estado del usuario a administrador
    const changeAdminUser = async (user) => {
        const isUserAdmin = makeAdminUser(user);
        console.log(isUserAdmin);
        return getUsers();
    };

    //abre el formulario
    const handlePostUser = () => {
        setNewUser(true);
    };

    //Cierra el formulario
    const handleCloseForm = () => {
        setNewUser(false);
        setMessagePost("");
        setUser({
            name: "",
            email: "",
            picture: "",
            nickName: "",
            admin: "",
            banned: "",
            address: "",
        });
        setUserError({
            name: "",
            email: "",
            picture: "",
            nickName: "",
            admin: "",
            banned: "",
            address: "",
        });
    };

    const handleInputChange = (event) => {
        const nameInput = event.target.name;
        const valueInput = event.target.value;

        setUser({ ...user, [nameInput]: valueInput });
        setUserError(validateUser({ ...user, [nameInput]: valueInput }));
    };

    const handlePostUserForm = async (event) => {
        event.preventDefault();
        if (!user.name || !user.email || !user.nickName || !user.address)return setMessagePost("Debe ingresar los datos");

        console.log("click")
        await postUserRequest(user)
        console.log("click2")
        // await new Promise(resolve => setTimeout(resolve, 200));
        getUsers()
        console.log("click3")
        setNewUser(false);
    };
 
    //lice-cycle
    useEffect(() => {
        if (!allUsers.length) getUsers();
    }, []);

    //component:
    return (
        <div className={styles.contain}>
            <h1>Users:</h1>
            {newUser ? (
                <div>
                    <button onClick={handleCloseForm}>X</button>
                    <form>
                        {messagePost && <p>{messagePost}</p>}
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
                <>
                    <button onClick={handlePostUser}>
                        Agregar nuevo usuario
                    </button>
                    <br />
                </>
            )}
            {allUsers.length &&
                allUsers.map((user, index) => {
                    return (
                        <span key={index}>
                            {!user.admin && (
                                <div>
                                    <button
                                        onClick={() => hide_user(user)}
                                        name="banned"
                                    >
                                        {user.banned ? "Desbanear" : "Banear"}
                                    </button>
                                    <button
                                        onClick={() => changeAdminUser(user)}
                                        name="admin"
                                    >
                                        Hacer Adminitrador
                                    </button>
                                </div>
                            )}
                            {user.admin && <p>Es un administrador!</p>}

                            <label key={index}>
                                <p>Nombre: {user.name}</p>
                                <p>Email: {user.email}</p>
                                <p>Imagen: {user.picture}</p>
                                <p>Admin: {user.admin ? "true" : "false"}</p>
                                <p>Baneado: {user.banned ? "true" : "false"}</p>
                                {user.banned && <p>Usuario desactivado</p>}
                                <p>
                                    Suscripción:{" "}
                                    {user.expirationDate
                                        ? user.expirationDate
                                        : false}
                                </p>
                                <p>Nickname: {user.nickName}</p>
                            </label>
                            <br />
                        </span>
                    );
                })}
        </div>
    );
};

export default User;
