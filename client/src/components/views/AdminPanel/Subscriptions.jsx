import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

const Subscriptions = () =>{

    const subscriptions = useSelector((state) => state.subscriptions)


    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getSubscriptions())    
    },[])

    return (
        <div>
            <h1>Suscripciones</h1>
            {subscriptions.length ? 
                (
                <div>

                </div>
            ) 
            : (
                <div>

                </div>
            )}

        </div>
    )
}

export default Subscriptions