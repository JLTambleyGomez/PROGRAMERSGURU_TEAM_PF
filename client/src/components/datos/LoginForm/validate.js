// CHEQUEAR PASSWORD REGEX
const validate = (userData, errors, setErrors) => {
  let newErrors = { ...errors };
  const emailRegex = new RegExp(
    /^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/
  );
  const passwordRegex = new RegExp(/^(?=.*\d).{6,10}$/);

  //email:
  if (!userData.email) {
    newErrors.email = "Se requiere un correo electrónico";
  } else if (userData.email.length > 256) {
    newErrors.email =
      "El correo electrónico es demasiado largo (máximo 35 caracteres)";
  } else if (!emailRegex.test(userData.email)) {
    newErrors.email = "Correo electrónico inválido";
  } else {
    newErrors.email = ""; // Eliminamos el mensaje de error si el correo electrónico es válido
  }

  //password:
  if (!userData.password) {
    newErrors.password = "Se requiere una contraseña";
  } else if (!passwordRegex.test(userData.password)) {
    newErrors.password =
      "La contraseña debe contener de 6 a 10 caracteres y al menos 1 número";
  } else {
    newErrors.password = ""; // Eliminamos el mensaje de error si la contraseña es válida
  }

  setErrors(newErrors);
};

export default validate;
