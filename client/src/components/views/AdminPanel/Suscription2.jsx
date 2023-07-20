import { useEffect, useState } from "react";
import { validateSuscription } from "./validate";
import { useSelector, useDispatch } from "react-redux";
import {
    get_suscriptions,
    put_suscription,
    delete_suscription,
    post_suscription,
} from "../../../Redux/actions";

const Suscription2 = () => {
    //estados globales
    const subscriptions = useSelector((state) => state.subscriptions);

    //hooks
    const dispatch = useDispatch();

    //estados locales
    const [openForm, setOpenForm] = useState(false);
    const [newSuscription, setNewSuscription] = useState({
        title: "",
        description: "",
        image: "",
        type: "",
    });
    const [errorSuscription, setErrorSuscription] = useState({
        title: "",
        description: "",
        image: "",
        type: "",
    });

    //handlers
    const handleOpenForm = () => {
        setOpenForm(true);
    };

    const handleInputChange = (event) => {
        const nameInput = event.target.name;
        const valueInput = event.target.value;

        setNewSuscription({ ...newSuscription, [nameInput]: valueInput });
        setErrorSuscription(
            validateSuscription({ ...newSuscription, [nameInput]: valueInput })
        );
    };

    const handlePostForm = (event) => {
        event.preventDefault();
        dispatch(post_suscription(newSuscription));
        dispatch(get_suscriptions());
    };
    const handleDeleteSuscription = () => {};

    useEffect(() => {
        if (!subscriptions.length) dispatch(get_suscriptions());
    }, [subscriptions, dispatch]);
    return (
        <div>
            <h1>Suscription</h1>

            {openForm ? (
                <div>
                    <h1>Form</h1>
                    <form>
                        <div>
                            <label htmlFor="title">Titulo:</label>
                            <input
                                name="title"
                                value={newSuscription.title}
                                onChange={handleInputChange}
                            />
                            {errorSuscription.title && (
                                <p>{errorSuscription.title}</p>
                            )}
                        </div>
                        <div>
                            <label htmlFor="description">Descripción:</label>
                            <input
                                name="description"
                                value={newSuscription.description}
                                onChange={handleInputChange}
                            />
                            {errorSuscription.description && (
                                <p>{errorSuscription.description}</p>
                            )}
                        </div>
                        <div>
                            <label htmlFor="image">Imagen:</label>
                            <input
                                name="image"
                                value={newSuscription.image}
                                onChange={handleInputChange}
                            />
                            {errorSuscription.image && (
                                <p>{errorSuscription.image}</p>
                            )}
                        </div>
                        <div>
                            <label htmlFor="type">Tipo:</label>
                            <input
                                name="type"
                                value={newSuscription.type}
                                onChange={handleInputChange}
                            />
                            {errorSuscription.type && (
                                <p>{errorSuscription.type}</p>
                            )}
                        </div>
                        <button onClick={handlePostForm}>Añadir</button>
                    </form>
                </div>
            ) : (
                <button onClick={handleOpenForm}>Añadir suscripción</button>
            )}

            {subscriptions.length &&
                subscriptions.map((sub, index) => (
                    <div key={index}>
                        <button onClick={handleDeleteSuscription}>
                            Borrar suscription
                        </button>
                        <p>Titulo: {sub.title}</p>
                        <p>Descripcion: {sub.description}</p>
                        <p>Image: {sub.image}</p>
                        <p>Tipo: {sub.type}</p>
                    </div>
                ))}
        </div>
    );
};

export default Suscription2;
