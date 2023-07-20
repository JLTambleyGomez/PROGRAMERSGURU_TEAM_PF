import { useSelector, useDispatch } from "react-redux";

import { delete_suscription } from "../../../Redux/actions";

const Borrar = () => {
    const dispatch = useDispatch();

    const handleborrar = () => {
        dispatch(delete_suscription(64));
    };

    return (
        <>
            <button onClick={handleborrar}>Borrar</button>
        </>
    );
};
export default Borrar;
