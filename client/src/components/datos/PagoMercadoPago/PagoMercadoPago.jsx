import axios from "axios"
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

const PagoMercadopago=({reference})=>{
console.log(reference)
initMercadoPago('APP_USR-91891ea2-0ef0-4e46-b5b0-8ef1477c71f2');

const [preferenceId,setPreferenceId]= useState(null);
const dispatch = useDispatch()

const createMercadopagoReference = async()=>{
    try {
        console.log(reference)
        const {data}= await axios.post("http://localhost:3001/Mp/create_preference", reference)
        const id = data.id
        return id;
    } catch (error) {
    }
};

const handleBuy= async()=>{

    const id= await createMercadopagoReference();
    if(id){
        setPreferenceId(id)
    
    }
}
useEffect(()=>{

handleBuy()
},[])

return(
    <div>
        {preferenceId && <Wallet initialization={{ preferenceId }} />}
    </div>
)

}


export default PagoMercadopago;
