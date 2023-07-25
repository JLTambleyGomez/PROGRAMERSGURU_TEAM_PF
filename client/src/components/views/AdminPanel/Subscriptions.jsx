import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    get_suscriptions,
    put_suscription,
    delete_suscription,
    post_suscription,
    adminPanelMensajesLocales,
    clearMessage
} from "../../../Redux/actions";
import { validateSuscription } from "./validate";
import { Table } from "react-bootstrap";



//_________________________module_________________________
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
    const handleDeleteSubscription = async (id) => {
        await dispatch(delete_suscription(id));
        await dispatch(get_suscriptions());
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

    const handleSubmitForm =async (event) => {
        event.preventDefault();

        if (
            erroSuscription.title ||
            erroSuscription.description ||
            erroSuscription.image ||
            erroSuscription.type
        ){
            await setMessagePost("Revise los datos");
            return dispatch(adminPanelMensajesLocales(messagePost))
        }


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
            ){
              await setMessagePost("Debe ingresar los datos")
              return dispatch(adminPanelMensajesLocales(messagePost))
            }

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


    //life-cycles:
    useEffect(() => {
        dispatch(get_suscriptions());
    }, [dispatch]);

    useEffect(() => {
        (async () => {
            await new Promise(resolve => setTimeout(resolve, 5000));
            dispatch(clearMessage());
        })()
    }, [dispatch])


    //component:
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
                                    <option value="trimestral">trimestral</option>
                                    <option value="semestral">
                                        semestral
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
              
<Table striped bordered hover >
                
 
                <tbody >
                <thead >
                  <tr>
                    <th>#</th>
                    <th>Nombre</th>
                    <th>Acción</th>
                  </tr>
                </thead>
                
                {!!subscriptions.length &&
                    subscriptions?.map((subscription) => (
                      
                    <tr key={subscription.id}>
                      <td>{subscription.id}</td>
                      <td> {subscription.title}</td>
                      <td> {subscription.description}</td>
                            <td>{subscription.type}</td>
                            <td>Precio: {subscription.price}</td>
                            <td>
                            <button   onClick={() => handleDeleteSubscription(subscription.id)}
                            >
                                Eliminar
                            </button></td>
                            <td>
                            <button
                                onClick={handleEditSubscription}
                                value={subscription.id}
                            >
                                Editar
                            </button></td>
                     
                    </tr>
                  ))}
                </tbody>
              </Table>





            </ul>

           
        </div>
    );
};

export default Subscriptions;
