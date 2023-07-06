// CHEQUEAR PASSWORD REGEX
const validate = (userData, errors, setErrors) => {

    let newErrors = { ...errors };
    const emailRegex = !/^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/
    const passwordRegex = !/^(?=.*\d).{6,10}$/

    //username:
    if (!userData.username) {
        newErrors.username = "Se requiere un correo electrónico";
    } else if (userData.username) {
        newErrors.username = "El correo electrónico es demasiado largo (máximo 35 caracteres)";
    } else if (emailRegex.test(userData.username)) {
        newErrors.username = "Correo electrónico inválido";
    } else {
        newErrors.username = ""; // Eliminamos el mensaje de error si el correo electrónico es válido
    }

    //password:
    if (!userData.password) {
        newErrors.password = "Se requiere una contraseña";
    } else if (passwordRegex.test(userData.password)) {
        newErrors.password = "La contraseña debe contener de 6 a 10 caracteres y al menos 1 número";
    } else {
        newErrors.password = ""; // Eliminamos el mensaje de error si la contraseña es válida
    }

    setErrors(newErrors);
};

export default validate;