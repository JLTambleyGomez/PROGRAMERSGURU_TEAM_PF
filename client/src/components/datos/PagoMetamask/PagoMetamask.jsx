import React, { useEffect, useState } from 'react';






const PagoMetamask =()=>{
    const [errorMessage,setErrorMessage]= useState(null)
    

    return(
        <div>
            {/* <button onClick={ a}></button> */}
            <h2>Balance $</h2> <p>Address</p>
            <h1>conexión a metamask</h1>
        </div>
    )
}

export default PagoMetamask;
