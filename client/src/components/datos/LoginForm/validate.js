// CHEQUEAR PASSWORD REGEX
const validate = ({ email, password }, errors, setErrors) => {

    let newErrors = { ...errors };
    const emailRegex = new RegExp(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{3,}$/
    );
    const passwordRegex = new RegExp(/^(?=.*\d).{6,20}$/);
    const passwordRegexNumber = new RegExp(/[1-9]/g)

    //email:
    if (!email) {
        newErrors.email = 
            "Se requiere un correo electrónico";
    } else if (email.length > 35) {
        newErrors.email =
            "El correo electrónico es demasiado largo (máximo 35 caracteres)";
    } else if (!emailRegex.test(email)) {
        newErrors.email = 
            "Correo electrónico inválido";
    } else {
        newErrors.email = ""; // Eliminamos el mensaje de error si el correo electrónico es válido
    }

    //password:
    if (!password) {
        newErrors.password = 
            "Se requiere una contraseña";
    } else if (password.length < 6) {
        newErrors.password =
            "La contraseña debe contener al menos 6 caracteres";        
    } else if (password.length > 20) {
        newErrors.password =
            "La contraseña debe contener un máximo de 20 caracteres";
    } else if (!passwordRegexNumber.test(password)) {
        newErrors.password =
            "La contraseña debe contener al menos 1 número";
    } else if (!passwordRegex.test(password)) {
        newErrors.password =
            "La contraseña debe contener de 6 a 20 caracteres";
    } else {
        newErrors.password = ""; // Eliminamos el mensaje de error si la contraseña es válida
    }

    setErrors(newErrors);
};

export default validate;
