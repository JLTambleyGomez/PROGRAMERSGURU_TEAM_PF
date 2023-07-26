
let URL = null
const Seleccion = 2

const seleccionUrl =()=>{
    if (Seleccion === 1){
        URL = 'http://localhost:3001/'
    } else
    if(Seleccion===2){
        URL = 'https://pfserverdeploy-production.up.railway.app/' 
    }
}
seleccionUrl()



export default URL
