import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { get_User_By_Email } from "../../../Redux/actions"
import { useNavigate } from "react-router-dom";

//_________________________module_________________________
function MercadoPagoPendiente () {

    //const:
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const email = sessionStorage.getItem("email");

    //life-cycles:
    useEffect(() => {
        const token = sessionStorage.getItem("accessToken")
        if (!token) navigate("/IniciaSession")
    },[])


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