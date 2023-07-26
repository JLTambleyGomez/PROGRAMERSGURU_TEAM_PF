
let URL = null
const Seleccion = 1

const seleccionUrl =()=>{
    if (Seleccion === 2){
        URL = 'http://localhost:3001/'
    } else
    if(Seleccion===2){
        URL = 'https://pfserverdeploy-production.up.railway.app/' 
    }
}
seleccionUrl()



export default URL
