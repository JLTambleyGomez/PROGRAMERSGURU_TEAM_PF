export default function validate ( { category } ) {
    error = {}
    if (form.category.length < 1) error.category = 'Debe ingresar un nombre'
    if (form.category.length < 2  || form.category.length > 10) error.category = 'Debe ingresar un nombre entre 2 y 10 caracteres'

    return error
}
