import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { get_User_By_Email } from "../../../Redux/actions"
import { useNavigate } from "react-router-dom";

//_________________________module_________________________
function MercadoPagoPendiente () {

    //const:
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const email = localStorage.getItem("email");
    const token = localStorage.getItem("accessToken");

    //life-cycles:
    useEffect(() => {
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