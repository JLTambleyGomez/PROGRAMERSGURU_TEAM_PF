import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { get_suscriptions, put_suscription, delete_suscription, post_suscription} from "../../../Redux/actions";
import { validateProduct } from "./validate";

//_________________________module_________________________
const Subscriptions = () =>{

    //estados globales
    const subscriptions = useSelector((state) => state.subscriptions)

    //hoohks
    const dispatch = useDispatch()

    //estados locales
    const [newSubscription, setNewSubscription] = useState({title:'', description:'', image: '', type: ''})
    const [errorSubscription, setErrorSubscription] = useState({title:'', description:'', image: '', type: ''})
    // const [subscription, setSubscription] = useState({title:'', description:'', image: '', type: ''})

    //handlers
    const handleSuscription = (event) => {
        const nombre = event.target.name
        const idSuscription = event.target.value

        if(nombre === 'eliminar') {
            console.log('eliminado')
            dispatch(delete_suscription(idSuscription))
            dispatch(get_suscriptions())    
        }

        if(nombre === 'editar') {
            console.log('eliminado')
            const subscription = subscriptions.find(sub => sub.idSuscription)
            dispatch(put_suscription(idSuscription, subscription))
            dispatch(get_suscriptions())    
        }
    }

    const handleSuscriptionFormChange = (event) => {
        const nameInput = event.target.name
        const valor = event.target.value

        setNewSubscription({...newSubscription,[nameInput]: valor})
        setErrorSubscription(validateSuscription({...newSubscription,[nameInput]: valor}))
    }

    const handleSuscriptionFormSubmit = (event) => {
        event.preventDefault();
        dispatch(post_suscription(newSubscription))
        dispatch(get_suscriptions())
    }

    useEffect(() => {
        dispatch(get_suscriptions())
    },[])


    //component:
    return (
        <div>
            <h1>Suscripciones</h1>
            {
                !subscriptions.length < 3 && 
                ( 
                    <div>
                        <form>
                            <div>
                                <label htmlFor="title">Titulo: </label>
                                <input name='title' value={newSubscription.title} onChange={handleSuscriptionFormChange} />
                                {errorSubscription.title && (<span>{errorSubscription.title}</span>)}
                            </div>
                            <div>
                                <label htmlFor="description">Descripción: </label>
                                <input name="description" value={newSubscription.description} onChange={handleSuscriptionFormChange}/>
                                {errorSubscription.description && (<span>{errorSubscription.description}</span>)}
                            </div>
                            <div>
                                <label htmlFor="image">Imagen: </label>
                                <input name="image" value={newSubscription.image} onChange={handleSuscriptionFormChange}/>
                                {errorSubscription.image && (<span>{errorSubscription.image}</span>)}
                            </div>
                            <div>
                                <label htmlFor="type">Tipo: </label>
                                <input name="type" value={newSubscription.type} onChange={handleSuscriptionFormChange}/>
                                {errorSubscription.type && (<span>{errorSubscription.type}</span>)}
                            </div>

                            <button onClick={handleSuscriptionFormSubmit}>Añadir Suscripción</button>
                        </form>
                    </div>
                )
            }
            {subscriptions.length && subscriptions.map(sub => {
                return (
                    <span>
                        <div onClick={handleSuscription} name='eliminar' value={sub.id} >Eliminar Suscripción</div>
                        <div onClick={handleSuscription} name='editar' value={sub.id} >Editar Suscripción</div>
                        <label>
                            <p>{sub.title}</p>
                            <p>{sub.description}</p>
                            <p>{sub.image}</p>
                            <p>{sub.type}</p>
                        </label>
                    </span>
                )
            })}

        </div>
    )
}

export default Subscriptions