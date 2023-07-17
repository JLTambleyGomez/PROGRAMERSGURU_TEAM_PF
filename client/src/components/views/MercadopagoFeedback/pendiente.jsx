import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { get_User_By_Email } from "../../../Redux/actions"


//_________________________module_________________________
function MercadoPagoPendiente () {

    //const:
    const dispatch = useDispatch();
    const email = localStorage.getItem("email");

    //life-cycles:
    useEffect(() => {
        dispatch(get_User_By_Email(email))
    }, [])


    //component:
    return (        
        <div>
            falló
        </div>
    )
}


export default MercadoPagoPendiente;