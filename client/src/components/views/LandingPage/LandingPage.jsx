import { NavLink } from "react-router-dom"


const LandingPage = () => {

    return (
        <div>
            <div>
                hola soy santiago
            </div>
            <NavLink to = 'homepage'>
                <button style = {{height: '100px', width : '500px', backgroundColor: 'brown'}}>
                    GO HOME
                </button>
            </NavLink>
        </div>
    )
}




export default LandingPage