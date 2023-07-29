import { useDispatch, useSelector } from "react-redux";
import s from "./Profile.module.css";
import { get_User_By_Email } from "../../../Redux/actions";
import { useEffect, useState } from "react";

import { EditProfileForm } from "./ProfileComponents/EditProfileForm";
import { EditProfilePicture } from "./ProfileComponents/EditProfilePicture";
import { editUserData } from "../../../axiosRequests/axiosRequests";
import { NavBarProfile } from "./ProfileComponents/navBarProfile";
import { NavLink } from "react-router-dom";
import theme from "../../../theme/theme";

import { ShoppinngCart } from "./ProfileComponents/ShoppingCart/ShoppingCart";
import { Reviews } from "./ProfileComponents/Reviews/Reviews";
import { Favorites } from "./ProfileComponents/Favorites/Favorites";
import { PaymentOrders } from "./ProfileComponents/PaymentOrders/PaymentOrders";


import ModalProfile from "../ModalProfile/ModalProfile";
//_________________________module_________________________
function ProfileV2() {
    //global states:
    const user = useSelector((state) => state.user);
    const userId = user?.id;

    //local states
    const loadingFunction = (base) => {
        const suffix = loading ? "loading" : "";
            return `${base}-${suffix}`;
    }
    const [loading, setLoading] = useState(false)
    const [picture, setPicture] = useState("")
    const [removeComment, setRemoveComment] = useState(false);
    const [email, setEmail] = useState("");
    const [collapse, setCollapse] = useState(false);
    const [newUserData, setNewUserData] = useState({
        name: "",
        nickName: "",
        address: "",
        picture: "",
    });
    const [tab, setTab] = useState("favorites");

    //const:
    const gearConfig = "https://www.svgrepo.com/show/491415/gear.svg";
    const expirationDate = new Date(user?.expirationDate);
    const actualDate = new Date();
    const dispatch = useDispatch();

    //handlers

    const handleChange = (event) => {
        event.preventDefault();
        setNewUserData({
            ...newUserData,
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
        }
        setCollapse(!collapse);
        setNewUserData({
            name: "",
            picture: "",
            nickName: "",
            address: "",
        });
        dispatch(get_User_By_Email(localStorage.getItem("email")));

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
        localStorage.setItem("tab", event.target.name)
    };

    const openConfig = (event) => {
        event.preventDefault();
    };

    useEffect(() => {
        setTab(localStorage.getItem("tab") || "favorites")
        dispatch(get_User_By_Email(localStorage.getItem("email")));
        setPicture(user?.picture)
    }, [dispatch, removeComment, collapse, loading]);

    if (!user.name) return <ModalProfile />

    //component:
    return (
        <div className={s.profileContainer}>
            <div className={`${s.infoProfile} ${s[theme("infoProfile")]}`}>
                <div className={s.profileImage}>
                {loading && <div className={s.spinner}></div>}
                    {user?.admin ? (
                        <div className={s.config} onClick={openConfig}>
                            <NavLink to="/adminpanel">
                                <img src={gearConfig} alt="config" />
                            </NavLink>
                        </div>
                    ) : null}
                    {collapse ? (
                        <>
                        <div className={s.camera}>
                            <EditProfilePicture
                                userId={userId}
                                setPicture={setPicture}
                                setLoading={setLoading}
                            />
                        </div>
                        </>
                    ) : null}
                    <div className={`${collapse ? s.picture : s.editPicture} ${s[loadingFunction(collapse ? "picture" : "editPicture")]}`}>
                        <img className={s.image} src={picture} />
                    </div>
                </div>
                <h2>{user.name}</h2>
                <h5>{user.nickName}</h5>
                {user.address && <h5>Dirección: {user?.address}</h5> }
                
                <div className={s.profileButton}>
                    {!collapse ? (
                        <div className={s.refresh}>
                            <button className={s.save} onClick={toggleCollapse}>
                                Editar perfil
                            </button>
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
                        <EditProfileForm
                            handleChange={handleChange}
                            newUserData={newUserData}
                        />
                    ) : null}
                </div>
                <h5>
                    {actualDate > expirationDate
                        ? <div className={s.subscription}>
                            <>No posees suscripción activa</> 
                            <a href="/pagosubscripcion" className={s.link}>Suscribite aquí!</a>
                        </div>
                        : `Su suscripción vence en ${
                              Math.round((expirationDate - actualDate) /
                              (1000 * 60 * 60 * 24))
                          } días`}
                </h5>
            </div>
            <div className={s.content}>
                <NavBarProfile tab={tab} changeTab={changeTab} />
                {tab === "favorites" && (
                    <Favorites  favorites={user?.Courses} />
                )}
                {tab === "reseñas" && (
                    <Reviews                        
                        comments={user?.Comments}
                        removeComment={removeComment}
                        setRemoveComment={setRemoveComment}
                    />
                )}
                {tab === "compras" && <PaymentOrders payments={user?.Payments}/>}
                {tab === "carrito" && <ShoppinngCart />}
            </div>
        </div>
    );
}

export default ProfileV2;
