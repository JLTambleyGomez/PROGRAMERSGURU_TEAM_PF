import axios from "axios"
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'


//_________________________module_________________________


const PagoMercadopago = ( { reference } ) => {


    //states:
    const [preferenceId, setPreferenceId] = useState(null);


    //const:    
    const dispatch = useDispatch()


    //functions:
    console.log(reference)
    initMercadoPago('TEST-74e77fab-e33b-4709-8aef-3cb739639cc5');


    const createMercadopagoReference = async () => {
        try {
            console.log(reference)
            const { data } = await axios.post("/Mp/create_preference", reference)
            const id = data.id
            return id;
        } catch (error) {
            console.log(error)
        }
    };

    const handleBuy = async () => {
        const id = await createMercadopagoReference();
        id && setPreferenceId(id)
    }

    //life-cycles:
    useEffect(() => {
        handleBuy()
    }, [])


    //component:
    return(
        <div>
            { preferenceId && <Wallet initialization={{ preferenceId }}/> }
        </div>
    )
}


export default PagoMercadopago;
