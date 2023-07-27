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
import ObjectListUsers from './Paginacion/ObjectListUsers'

//_________________________module_________________________
const User = () => {
    //estados globales

    //hooks
    const dispatch = useDispatch();
    //estados locales
    const [allUsers, setAllUsers] = useState([]);
    const [messagePost, setMessagePost] = useState("");


    //put name:
    const handlePutForm = (id) => {
        setPutForm(id)
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
        console.log(email)
        const userBanned = await hideUserProfileRequest(email);
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
            <h1>Users</h1>
            <ObjectListUsers objects={allUsers} hide_user={hide_user} changeAdminUser={changeAdminUser} handlePutForm={handlePutForm}/>
                
        </div>
    );
};

export default User;
