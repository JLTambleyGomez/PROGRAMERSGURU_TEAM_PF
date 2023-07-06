export default function validate ( { category } ) {

    const error = {}

    if (category.length < 1) error.category = 'Debe ingresar un nombre'
    if (category.length < 1  || category.length > 20) error.category = 'Debe ingresar un nombre entre 2 y 10 caracteres'

    return error
}