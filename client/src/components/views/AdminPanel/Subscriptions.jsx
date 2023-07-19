import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    get_suscriptions,
    put_suscription,
    delete_suscription,
    post_suscription,
} from "../../../Redux/actions";
import { validateSuscription } from "./validate";

//_________________________module_________________________
const Subscriptions = () => {
    //estados globales
    const subscriptions = useSelector((state) => state.subscriptions);
    const message = useSelector((state) => state.message);
    const error = useSelector((state) => state.error);

    //hoohks
    const dispatch = useDispatch();

    //estados locales
    const [newSubscription, setNewSubscription] = useState({
        title: "",
        description: "",
        image: "",
        type: "",
    });
    const [errorSubscription, setErrorSubscription] = useState({
        title: "",
        description: "",
        image: "",
        type: "",
    });
    const [modificarSuscription, setModificarSuscription] = useState(false);
    const [postSuscription, setPostSuscription] = useState(false);
    const [messagePost, setMessagePost] = useState("");
    //handlers
    const handleSuscription = (event) => {
        const nombre = event.target.name;
        const idSuscription = event.target.value;

        if (nombre === "eliminar") {
            console.log("eliminando....");
            dispatch(delete_suscription(idSuscription)).then(() =>
                dispatch(get_suscriptions())
            );
        }

        if (nombre === "editar") {
            console.log("editando...");

            dispatch(put_suscription(idSuscription, newSubscription)).then(() =>
                dispatch(get_suscriptions())
            );
        }
    };

    const handleSuscriptionFormChange = (event) => {
        const nameInput = event.target.name;
        const valor = event.target.value;

        setNewSubscription({ ...newSubscription, [nameInput]: valor });
        setErrorSubscription(
            validateSuscription({ ...newSubscription, [nameInput]: valor })
        );
    };

    const handleSuscriptionFormSubmit = (event) => {
        event.preventDefault();
        if (
            !newSubscription.description ||
            !newSubscription.image ||
            !newSubscription.title ||
            !newSubscription.type
        )
            return setMessagePost("Debe ingresar los datos");

        dispatch(post_suscription(newSubscription)).then(() =>
            dispatch(get_suscriptions())
        );
    };
    const handleClosingForm = () => {
        setModificarSuscription(false);
        setPostSuscription(false);
    };

    const handlePostSuscription = () => {
        setPostSuscription(true);
    };

    useEffect(() => {
        if (!subscriptions.length) dispatch(get_suscriptions());
    }, []);

    useEffect(() => {}, []);

    console.log(subscriptions);
    //component:
    return (
        <div>
            <h1>Suscripciones</h1>
            {subscriptions.length < 3 && (
                <button onClick={handlePostSuscription}>
                    Añadir suscripción
                </button>
            )}
            {postSuscription && <button onClick={handleClosingForm}>X</button>}
            {modificarSuscription && (
                <button onClick={handleClosingForm}>X</button>
            )}
            {postSuscription || modificarSuscription ? (
                <form>
                    <div>
                        {messagePost && <p>{messagePost}</p>}
                        <label htmlFor="title">Titulo: </label>
                        <input
                            name="title"
                            value={newSubscription.title}
                            onChange={handleSuscriptionFormChange}
                        />
                        {errorSubscription.title && (
                            <span>{errorSubscription.title}</span>
                        )}
                    </div>
                    <div>
                        <label htmlFor="description">Descripción: </label>
                        <input
                            name="description"
                            value={newSubscription.description}
                            onChange={handleSuscriptionFormChange}
                        />
                        {errorSubscription.description && (
                            <span>{errorSubscription.description}</span>
                        )}
                    </div>
                    <div>
                        <label htmlFor="image">Imagen: </label>
                        <input
                            name="image"
                            value={newSubscription.image}
                            onChange={handleSuscriptionFormChange}
                        />
                        {errorSubscription.image && (
                            <span>{errorSubscription.image}</span>
                        )}
                    </div>
                    <div>
                        <label htmlFor="type">Tipo: </label>
                        <input
                            name="type"
                            value={newSubscription.type}
                            onChange={handleSuscriptionFormChange}
                        />
                        {errorSubscription.type && (
                            <span>{errorSubscription.type}</span>
                        )}
                    </div>

                    <button onClick={handleSuscriptionFormSubmit}>
                        {modificarSuscription ? "Editar " : "Añadir "}
                    </button>
                </form>
            ) : (
                <></>
            )}
            <br />
            {error && <span>{error}</span>}
            {!!subscriptions.length &&
                subscriptions.map((sub, index) => {
                    return (
                        <span key={index}>
                            <button
                                onClick={handleSuscription}
                                name="eliminar"
                                value={sub.id}
                            >
                                Eliminar Suscripción
                            </button>
                            <button
                                onClick={handleSuscription}
                                name="editar"
                                value={sub.id}
                            >
                                Editar Suscripción
                            </button>
                            <label>
                                <p>{sub.title}</p>
                                <p>{sub.description}</p>
                                <p>{sub.image}</p>
                                <p>{sub.type}</p>
                            </label>
                        </span>
                    );
                })}{" "}
            */
        </div>
    );
};

export default Subscriptions;
