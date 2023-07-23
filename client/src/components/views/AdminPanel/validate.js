export const validate = (form) => {
    const error = {};

    if (form.name.length < 1) error.name = "Debe ingresar un nombre";
    if (form.name.length < 1 || form.name.length > 20)
        error.name = "Debe ingresar un nombre entre 2 y 10 caracteres";

    return error;
};
//validacion del formulario
export const validateProduct = (form) => {
    const error = {};

    if (!form.name.length) error.name = "Debe agregar un nombre válido";
    else if (form.name.length) error.name = "";

    if (!form.description.length)
        error.description = "Debe agregar una descripción válida";
    else if (form.description.length) error.description = "";

    if (!form.price.length) error.price = "Debe ingresar un precio";
    if (form.price < 1) error.price = "Debe ingresar un precio válido";
    else if (form.price.length) error.price = "";

    if (!form.image.length) error.image = "Debe ingresar una imagen";
    else if (form.image.length) error.image = "";

    if (!form.category) error.category = "Debe ingresar una categoria";
    else if (form.category.length) error.category = "";

    if (!form.stock.length) error.stock = "Debe ingresar un precio válido";
    if (form.stock < 1) error.stock = "Debe ingresar el stock";
    else if (form.stock.length) error.stock = "";

    return error;
};

export const validateCourse = (form) => {
    const error = {};

    const imageRegex =
        /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*\.(jpg|jpeg|png|gif|bmp)$/i;
    const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;

    //validar titulo
    if (!form.title.length) error.title = "Debe ingresar un titulo";
    else if (form.title.length) error.title = "";

    //validar descripcion
    if (!form.description.length)
        error.description = "Debe agregar una descripción";
    else if (form.description.length) error.description = "";

    //validar imagenURL
    if (!form.imageURL.length)
        error.imageURL = "Debe agregar una imagen del curso";
    else if (imageRegex.test(form.imageURL))
        error.imageURL = "Debe agregar una URL válida";
    else if (!form.imageURL.length) error.imageURL = "";

    //validar courseURL
    if (!form.courseUrl.length) error.courseUrl = "Debe ingresar una URL";
    else if (!urlRegex.test(form.courseUrl))
        error.courseUrl = "Debe agregar una dirección válida";
    else if (form.courseUrl.length) error.courseUrl = "";

    //validar rating
    if (!form.rating.length) error.rating = "Debe ingresar un rating";
    else if (isNaN(form.rating))
        error.rating = "Debe ingresar un número válido";
    else if (form.rating < 1 || form.rating > 10)
        error.rating = "Debe ingresar un rating válido, entre 1 y 10";
    else if (form.rating.length) error.rating = "";

    //validar isFree

    //validar language
    if (!form.language.length) error.language = "Debe ingresar un idioma";
    else if (form.language !== "Español" && form.language !== "Ingles")
        error.language = "Debe ingresar un idioma, Ingles o Español";
    else error.language = "";

    //validar categorias

   
    if (!form.categories.length)
        error.categories = "Debe seleccionar las categorias";
    else if (form.categories.length) error.categories = "";

    return error;
};

export const validateUser = (form) => {
    const error = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    //nombre usuario
    if (!form.name.length) error.name = "Debe ingresar un nombre";
    else if (form.name.length) error.name = "";

    //email
    if (!form.email.length) error.email = "Debe ingresar un email";
    else if (!emailRegex.test(form.email))
        error.email = "Debe ingresar un email válido";
    else if (form.email.length) error.email = "";

    //nickName
    if (!form.nickName.length) error.nickName = "Debe ingresar un nickName";
    else if (form.nickName.length) error.nickName = "";

    //address
    if (!form.address.length) error.address = "Debe ingresar una dirección";
    else if (form.address.length) error.address = "";

    return error;
};

export const validateSuscription = (form) => {
    const error = {};

    //valida titulo
    if (!form.title.length) error.title = "Debe ingresar un titulo";
    else if (form.title.length) error.title = "";

    //valida descripción
    if (!form.description.length)
        error.description = "Debe agregar una descripción";
    else if (form.description.length) error.description = "";

    //valida imagen
    if (!form.image.length) error.image = "Debe agregar una imagen";
    else if (form.image.length) error.image = "";

    //valida tipo
    if (!form.type.length) error.type = "Debe ingresar un tipo";
    else if (form.type.length) error.type = "";


    //valida precio
    if (!form.price.length) error.price = "Debe ingresar un precio";
    else if (form.price < 1) error.price = "Debe ingresar un precio válido";
    else if (form.price && form.price > 0) error.price = "";

  
    return error;
};

export const validateTecnology = (form) => {
    const error ={}
    if(!form.length) error.name = 'Debes ingresar un nombre'
    else if(form.length) error.name = ''

    return error

}