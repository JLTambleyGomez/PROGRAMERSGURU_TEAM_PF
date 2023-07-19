import { useDispatch, useSelector } from "react-redux";
import s from "./Profile.module.css";
import {
    get_comments_by_user,
    get_User_By_Email,
} from "../../../Redux/actions";
import { useEffect, useState } from "react";

import { EditProfileForm } from "./ProfileComponents/EditProfileForm";
import { EditProfilePicture } from "./ProfileComponents/EditProfilePicture";
import { editUserData } from "../../../axiosRequests/axiosRequests";
import { Favorites } from "./ProfileComponents/Favorites";
import { Reviews } from "./ProfileComponents/Reviews";
import { Carrito } from "./ProfileComponents/Carrito";
import { Compras } from "./ProfileComponents/Compras";
import { NavBarProfile } from "./ProfileComponents/navBarProfile";
import axios from "axios"

//_________________________module_________________________
function ProfileV2() {
    //global states:
    const user = useSelector((state) => state.user);
    const userId = user.id;
    const userComments = useSelector((state) => state.userComments);

    //local states
    const [email, setEmail] = useState("");
    const [refresh, setRefresh] = useState(false);
    const [collapse, setCollapse] = useState(false);
    const [newUserData, setNewUserData] = useState({
        name: "",
        nickName: "",
        address: "",
        picture: "",
    });
    const [tab, setTab] = useState("favorites");

    //const:
    const gearConfig = "https://www.svgrepo.com/show/491415/gear.svg"
    const expirationDate = new Date(user.expirationDate);
    const actualDate = new Date();
    const dispatch = useDispatch();

    //handlers
    const notificacion=async (carta) => {
        await axios.post(`http://localhost:3001/user/sendEmail`, carta );
    };

    const handleChange = (event) => {
        event.preventDefault();
        setNewUserData({
            [event.target.id]: event.target.value,
        });
    };

    const toggleCollapse = (event) => {
        event.preventDefault();
        setCollapse(!collapse);
        setEmail(localStorage.getItem("email"));
    };
    const saveChanges = (event) => {
        event.preventDefault();
        setEmail(localStorage.getItem("email"));
        if (
            newUserData.name ||
            newUserData.picture ||
            newUserData.nickName ||
            newUserData.address
        ) {
            editUserData({ ...newUserData, email });
            notificacion({email , message:"Tu usuario ha sido modificado"});
        }
        setCollapse(!collapse);
        setNewUserData({
            name: "",
            picture: "",
            nickName: "",
            address: "",
        });
    };
    const discardChanges = (event) => {
        event.preventDefault();
        setCollapse(!collapse);
        setNewUserData({
            name: "",
            picture: "",
            nickName: "",
            address: "",
            email: "",
        });
    };
    const changeTab = (event) => {
        event.preventDefault();
        setTab(event.target.name);
    };

    const openConfig = (event) => {
        event.preventDefault();
    };

    useEffect(() => {
        dispatch(get_User_By_Email(localStorage.getItem("email")));
        dispatch(get_comments_by_user(user.id));
    }, [dispatch, refresh]);

    //component:
    return (
        <div className={s.profileContainer}>
            <div className={s.infoProfile}>
                <div className={s.profileImage}>
                    <div className={s.config} onClick={openConfig}>
                        <img
                            src={gearConfig}
                            alt="config"
                        />
                    </div>
                    {collapse ? (
                    <div className={s.camera}>
                        <EditProfilePicture 
                            userId={userId}
                            setNewUserData={setNewUserData}
                            newUserData={newUserData}/>
                    </div>
                    ) : null }
                    <div className={!collapse ? s.picture : s.editPicture}>
                        <img className={s.image} src={user.picture} />
                    </div>
                </div>
                <h2>{user.name}</h2>
                <h5>{user.nickName}</h5>
                <div className={s.profileButton}>
                    {!collapse ? (
                        <div className={s.refresh}>
                            <button className={s.save} onClick={toggleCollapse}>
                                Editar perfil
                            </button>
                            <img
                                onClick={() => setRefresh(!refresh)}
                                src="https://www.svgrepo.com/show/437992/refresh-cw.svg"
                                alt="actualizar"
                            />
                        </div>
                    ) : (
                        <button className={s.save} onClick={saveChanges}>
                            Guardar cambios
                        </button>
                    )}
                    {collapse ? (
                        <button className={s.discard} onClick={discardChanges}>
                            Descartar
                        </button>
                    ) : null}
                </div>
                <div>
                    {collapse ? (
                        <>
                            <EditProfileForm
                                handleChange={handleChange}
                                newUserData={newUserData}
                            />
                            <div>
                                <button className={s.desactivar}>
                                    Desactivar mi cuenta
                                </button>
                            </div>
                        </>
                    ) : null}
                </div>
                <h5>
                    {actualDate > expirationDate
                        ? "No posees suscripción activa"
                        : `Su suscripción vence en ${
                              (expirationDate - actualDate) /
                              (1000 * 60 * 60 * 24)
                          } días`}
                </h5>
            </div>
            <div className={s.content}>
                <NavBarProfile tab={tab} changeTab={changeTab} />
                {tab === "favorites" && <Favorites />}
                {tab === "reseñas" && <Reviews />}
                {tab === "compras" && <Compras />}
                {tab === "carrito" && <Carrito />}
            </div>
        </div>
    );
}

export default ProfileV2;
