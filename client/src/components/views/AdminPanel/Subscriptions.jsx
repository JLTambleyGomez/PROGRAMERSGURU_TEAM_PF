import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    get_suscriptions,
    put_suscription,
    delete_suscription,
    post_suscription,
} from "../../../Redux/actions";
import { validateSuscription } from "./validate";

const Subscriptions = () => {
    //estados globales
    const subscriptions = useSelector((state) => state.subscriptions);
    const message = useSelector((state) => state.message);
    const error = useSelector((state) => state.error);
    const dispatch = useDispatch();

    //estados locales
    const [messagePost, setMessagePost] = useState("");
    const [putSuscription, setPutSuscription] = useState(false);
    const [postSuscription, setPostSuscription] = useState(false);
    const [suscription, setSuscription] = useState({});
    const [suscriptionId, setSuscriptionId] = useState(null);
    const [formData, setFormData] = useState({
        id: "",
        title: "",
        description: "",
        image: "",
        type: "",
        price: "",
    });
    const [erroSuscription, setErrorSuscription] = useState({
        id: "",
        title: "",
        description: "",
        image: "",
        type: "",
        price: "",
    });

    //setea el estado local con los cambios que se producen en el input
    const handleInputChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
        if (postSuscription)
            setErrorSuscription(
                validateSuscription({
                    ...formData,
                    [event.target.name]: event.target.value,
                })
            );
        setMessagePost("");
    };

    //setea el estado local con el id y abre el form
    const handleEditSubscription = (event) => {
        const id = event.target.value;

        const suscripcionesModificar = subscriptions.find(
            (sub) => sub.id === +id
        );

        setSuscription(suscripcionesModificar);
        setSuscriptionId(id);
        setPostSuscription(false);
        setPutSuscription(true);
    };

    //abre el formulario
    const handleFormSuscription = () => {
        setPostSuscription(true);
    };

    //cierra el formulario y setea todos los estados de nuevo
    const hanldeCloseFormSuscription = () => {
        setPutSuscription(false);
        setPostSuscription(false);
        setFormData({
            id: "",
            title: "",
            description: "",
            image: "",
            type: "",
            price: "",
        });
        setErrorSuscription({
            id: "",
            title: "",
            description: "",
            image: "",
            type: "",
            price: "",
        });
    };
    const handleDeleteSubscription = (id) => {
        dispatch(delete_suscription(id)).then(() =>
            dispatch(get_suscriptions())
        );
        setFormData({
            id: "",
            title: "",
            description: "",
            image: "",
            type: "",
            price: "",
        });
        setErrorSuscription({
            id: "",
            title: "",
            description: "",
            image: "",
            type: "",
            price: "",
        });
    };

    const handleSubmitForm = (event) => {
        event.preventDefault();

        if (
            erroSuscription.title ||
            erroSuscription.description ||
            erroSuscription.image ||
            erroSuscription.type
        )
            return setMessagePost("Revise los datos");

        if (putSuscription) {
            dispatch(put_suscription(suscriptionId, formData)).then(() =>
                dispatch(get_suscriptions())
            );
        } else {
            if (
                !formData.image ||
                !formData.title ||
                !formData.description ||
                !formData.type
            )
                return setMessagePost("Debe ingresar los datos");
            dispatch(post_suscription(formData)).then(() =>
                dispatch(get_suscriptions())
            );
        }
        setPostSuscription(false);
        setPutSuscription(false);
        setFormData({
            id: "",
            title: "",
            description: "",
            image: "",
            type: "",
            price: "",
        });
        setErrorSuscription({
            id: "",
            title: "",
            description: "",
            image: "",
            type: "",
            price: "",
        });
    };

    useEffect(() => {
        if (!subscriptions.length) dispatch(get_suscriptions());
    }, [dispatch]);

    return (
        <div>
            {/* Renderizar la lista de suscripciones */}
            <h1>Suscripciones</h1>
            <ul>
                {!putSuscription && !postSuscription && (
                    <button onClick={handleFormSuscription}>
                        Añadir Suscripción
                    </button>
                )}

                {postSuscription || putSuscription ? (
                    <>
                        <button onClick={hanldeCloseFormSuscription}>X</button>
                        <h2>{postSuscription && "Añadir suscripción"}</h2>
                        <h2>{putSuscription && "Editar suscripción"}</h2>
                        <form>
                            <div>
                                {postSuscription || putSuscription ? (
                                    <></>
                                ) : (
                                    <></>
                                )}
                                {messagePost && <p>{messagePost}</p>}
                                <label>Titulo:</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    placeholder={
                                        putSuscription
                                            ? suscription.title
                                            : "Titulo"
                                    }
                                />
                                {erroSuscription.title && (
                                    <p>{erroSuscription.title}</p>
                                )}
                            </div>
                            <div>
                                <label>Descripción:</label>
                                <input
                                    type="text"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    placeholder={
                                        putSuscription
                                            ? suscription.description
                                            : "Descripción"
                                    }
                                />
                                {erroSuscription.description && (
                                    <p>{erroSuscription.description}</p>
                                )}
                            </div>
                            <div>
                                <label>Imagen:</label>
                                <input
                                    type="text"
                                    name="image"
                                    value={formData.image}
                                    onChange={handleInputChange}
                                    placeholder={
                                        putSuscription
                                            ? suscription.image
                                            : "Imagen"
                                    }
                                />
                                {erroSuscription.image && (
                                    <p>{erroSuscription.image}</p>
                                )}
                            </div>
                            <div>
                                <label>Tipo:</label>
                                <select
                                    name="type"
                                    value={formData.type}
                                    onChange={handleInputChange}
                                    placeholder={
                                        putSuscription
                                            ? suscription.type
                                            : "Tipo"
                                    }
                                >
                                    <option value="mensual">mensual</option>
                                    <option value="trimestral">
                                        trimestral
                                    </option>
                                    <option value="anual">anual</option>
                                </select>
                                {erroSuscription.type && (
                                    <p>{erroSuscription.type}</p>
                                )}
                            </div>
                            <div>
                                <label>Precio:</label>
                                <input
                                    type="number"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleInputChange}
                                    placeholder={
                                        putSuscription
                                            ? suscription.price
                                            : "Precio"
                                    }
                                />
                                {erroSuscription.price && (
                                    <p>{erroSuscription.price}</p>
                                )}
                            </div>
                            <button onClick={handleSubmitForm}>
                                {postSuscription ? "Añadir" : "Editar"}
                            </button>
                        </form>
                    </>
                ) : (
                    <></>
                )}
                {!!subscriptions.length &&
                    subscriptions?.map((subscription) => (
                        <li key={subscription.id}>
                            <h2>Titulo: {subscription.title}</h2>
                            <p>Descripción: {subscription.description}</p>
                            <p>Tipo: {subscription.type}</p>
                            <p>Precio: {subscription.price}</p>
                            <button
                                onClick={() =>
                                    handleDeleteSubscription(subscription.id)
                                }
                            >
                                Eliminar
                            </button>
                            <button
                                onClick={handleEditSubscription}
                                value={subscription.id}
                            >
                                Editar
                            </button>
                        </li>
                    ))}
            </ul>

            {/* <h2>
                {putSuscription ? "Editar suscripción" : "Añadir suscripción"}
            </h2>

            {formData.id ? (
                <button onClick={handleEditSubscription}>
                    Guardar Cambios
                </button>
            ) : (
                <button onClick={handleAddSubscription}>
                    {putSuscription ? "Editar" : "Agregar Suscripción"}
                </button>
            )}
            {error && <p>Error: {error}</p>}
            {message && <p>{message.message}</p>} */}
        </div>
    );
};

export default Subscriptions;
