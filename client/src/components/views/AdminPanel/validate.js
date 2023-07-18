export default function validate ( { category } ) {

    const error = {}

    if (category.length < 1) error.category = 'Debe ingresar un nombre'
    if (category.length < 1  || category.length > 20) error.category = 'Debe ingresar un nombre entre 2 y 10 caracteres'

    return error
}
    //validacion del formulario
// export function validateProduct (form) {
//         const error = {}

//         if(!form.name.length) error.name = 'Debe agregar un nombre válido'
//         else if(form.name.length) error.name = ''

//         if(!form.description.length) error.description = 'Debe agregar una descripción válida'
//         else if(form.description.length) error.description = ''

//         if(form.price < 0) error.price = 'Debe ingresar un precio válido'
//         else if(form.price.length) error.price = ''
        
//         if(!form.image.length) error.image = 'Debe ingresar una imagen'
//         else if(form.image.length) error.image = ''
        
//         if(!form.category.length) error.category = 'Debe ingresar una categoria'
//         else if(form.category.length) error.category = ''
        
//         if(form.stock < 0) error.stock = 'Debe ingresar el stock'
//         else if(form.stock.length) error.stock = ''
        
//         return error
//     }