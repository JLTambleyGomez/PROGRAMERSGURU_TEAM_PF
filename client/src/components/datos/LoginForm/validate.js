const validate = (userData, errors, setErrors) => {
  let newErrors = { ...errors };

  if (!userData.username) {
    newErrors.username = "Se requiere un correo electrónico";
  } else if (userData.username) {
    newErrors.username =
      "El correo electrónico es demasiado largo (máximo 35 caracteres)";
  } else if (
    !/^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/.test(
      userData.username
    )
  ) {
    newErrors.username = "Correo electrónico inválido";
  } else {
    newErrors.username = ""; // Eliminamos el mensaje de error si el correo electrónico es válido
  }

  if (!userData.password) {
    newErrors.password = "Se requiere una contraseña";
  } else if (!/^(?=.*\d).{6,10}$/.test(userData.password)) {
    newErrors.password =
      "La contraseña debe contener de 6 a 10 caracteres y al menos 1 número";
  } else {
    newErrors.password = ""; // Eliminamos el mensaje de error si la contraseña es válida
  }

  setErrors(newErrors);
};

export default validate;
