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
import {SubirImagenSuscription} from './SubirImagenSuscription'
import styles from "./Suscriptions.module.css"

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
        const name = event.target.name
        const value = event.target.value

        setFormData((prevSuscription) => ({
            ...prevSuscription, 
            [name]: (name === 'image' && localStorage.getItem('urlNewSuscription')) || value,
          }))

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
                                <SubirImagenSuscription handleInputChange={handleInputChange} title={putSuscription ? formData.title : suscription.title}/>
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
                <Table className={`${styles.Tabla} table table-striped table-bordered table-hover`}>
                 <tbody >
                <thead >
                   <tr><div className={styles.title}>
                   <p>#</p>
                    <p>Nombre</p>
                    <p>Descripción</p>
                    <p>Tipo de Suscripcion</p>
                    <p>Precio</p>
                    <p>Acciones</p>
                   </div>
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
                            <button onClick={() => handleDeleteSubscription(subscription.id)} className={styles.deleteButton}>
                              <svg xmlns="http://www.w3.org/2000/svg" className={styles.bin} viewBox="0 0 16 16">
                             <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
                          </svg></button>
                            </td>
                            <td>
                            <button onClick={handleEditSubscription} value={subscription.id} className={styles.modificarButton}><svg xmlns="http://www.w3.org/2000/svg" className={styles.mod} width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M3 21v-4a4 4 0 1 1 4 4h-4"></path><path d="M21 3a16 16 0 0 0 -12.8 10.2"></path><path d="M21 3a16 16 0 0 1 -10.2 12.8"></path><path d="M10.6 9a9 9 0 0 1 4.4 4.4"></path>
                               </svg></button>
                            </td>
                     
                    </tr>
                  ))}
                </tbody>
              </Table>





            </ul>

           
        </div>
    );
};

export default Subscriptions;
