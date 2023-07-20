import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    get_suscriptions,
    put_suscription,
    delete_suscription,
    post_suscription,
} from "../../../Redux/actions";
import { validateSuscription } from "./validate";
import Borrar from "./borrar";

const Subscriptions = () => {
    const subscriptions = useSelector((state) => state.subscriptions);
    const message = useSelector((state) => state.message);
    const error = useSelector((state) => state.error);
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        id: "",
        title: "",
        description: "",
        image: "",
        type: "",
    });

    const handleInputChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    const handleAddSubscription = () => {
        dispatch(post_suscription(formData)).then(() =>
            dispatch(get_suscriptions())
        );
    };

    const handleEditSubscription = () => {
        dispatch(put_suscription(formData.id, formData));
        dispatch(get_suscriptions());
    };

    const handleDeleteSubscription = (id) => {
        dispatch(delete_suscription(id)).then(() =>
            dispatch(get_suscriptions())
        );
    };

    useEffect(() => {
        if (!subscriptions.length) dispatch(get_suscriptions());
    }, [dispatch]);

    return (
        <div>
            {/* Renderizar la lista de suscripciones */}
            <h1>Suscripciones</h1>
            <ul>
                {subscriptions.length &&
                    subscriptions?.map((subscription) => (
                        <li key={subscription.id}>
                            <h2>{subscription.title}</h2>
                            <p>{subscription.description}</p>
                            <p>{subscription.type}</p>
                            <button
                                onClick={() =>
                                    handleDeleteSubscription(subscription.id)
                                }
                            >
                                Eliminar
                            </button>
                            <button onClick={() => setFormData(subscription)}>
                                Editar
                            </button>
                        </li>
                    ))}
            </ul>

            {/* Formulario para agregar o editar suscripción */}
            <h2>Agregar / Editar Suscripción</h2>
            <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Título"
            />
            <input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Descripción"
            />
            <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleInputChange}
                placeholder="URL de la imagen"
            />
            <select
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                placeholder="Tipo de suscripción"
            >
                <option value="mensual">mensual</option>
                <option value="trimestral">trimestral</option>
                <option value="anual">anual</option>
            </select>
            {formData.id ? (
                <button onClick={handleEditSubscription}>
                    Guardar Cambios
                </button>
            ) : (
                <button onClick={handleAddSubscription}>
                    Agregar Suscripción
                </button>
            )}
            {error && <p>Error: {error}</p>}
            {message && <p>{message.message}</p>}
        </div>
    );
};

export default Subscriptions;
