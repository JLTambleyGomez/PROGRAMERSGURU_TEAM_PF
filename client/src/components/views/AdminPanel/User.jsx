import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Table } from "react-bootstrap";

import {
    getAllUsersRequest,
    hideUserProfileRequest,
    makeAdminUser,    
} from "../../../axiosRequests/axiosRequests";

import { post_user, put_user, delete_user, clearMessage } from "../../../Redux/actions";
import { validateUser } from "./validate";

import styles from "./User.module.css";   


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

    //PUT:
    const [putForm, setPutForm] = useState(null);

    //put name:
    const handlePutForm = (id) => {
        setPutForm(id)
    }

    const syncInputName = (event, user) => {
        user.name = event.target.value;
    }

    const updateUser = async (id) => {
        await dispatch(put_user(id))
        setPutForm(null);
    }


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
        if (!user.name || !user.email || !user.nickName || !user.address) return setMessagePost("Debe ingresar los datos");

        console.log("click")
        await dispatch (post_user(user))
        console.log("click2")
        // await new Promise(resolve => setTimeout(resolve, 200));
        await getUsers()
        console.log("click3")
        setNewUser(false);
    };


 
    //life-cycles:
    useEffect(() => {
        if (!allUsers.length) getUsers();
    }, []);
    
    useEffect(() => {
        (async () => {
            await new Promise(resolve => setTimeout(resolve, 5000));
            dispatch(clearMessage());
        })()
    }, [dispatch])


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
   <Table className={`${styles.Tabla} table table-striped table-bordered table-hover`}>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nombre</th>
                        <th>Email</th>
                        <th>Admin</th>
                        <th>Baneado</th>
                        <th>Suscripción</th>
                        <th>Nickname</th>
                        <th>Acción</th>
                    </tr>
                </thead>
                <tbody>
                    {allUsers.length > 0 && allUsers.map((user, index) => {
                        return (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.admin ? "true" : "false"}</td>
                                <td>{user.banned ? "true" : "false"}</td>
                                <td>{user.expirationDate || "No disponible"}</td>
                                <td>{user.nickName}</td>
                                <td>
                                    {!user.admin && (
                                        <>
                                            <button onClick={() => hide_user(user.email)}>
                                                {user.banned ? "Desbanear" : "Banear"}
                                            </button>
                                            <button onClick={() => changeAdminUser(user)}>
                                                Hacer Administrador
                                            </button>
                                            <button onClick={() => handlePutForm(user.id)}>
                                                Editar nombre
                                            </button>
                                        </>
                                    )}
                                    {user.admin && <p>Es un administrador!</p>}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>

                
        </div>
    );
};

export default User;
