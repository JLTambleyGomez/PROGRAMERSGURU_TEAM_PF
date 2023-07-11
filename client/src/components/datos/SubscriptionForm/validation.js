const validation = (form) => {
  const error = {};
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const regex = /^(?=.*\d).{6,10}$/;

  if (!form.name.length) error.name = "Debe ingresar un nombre";
  else error.name = "";

  if (!form.email.length) error.email = "Debe ingresar un email";
  else if (!regexEmail.test(form.email))
    error.email = "Debe ingresar un email válido";
  else error.email = "";

  if (!form.username.length) error.username = "Debe ingresar un username";
  else error.username = "";

  if (!form.password.length) error.password = "De ingresar una contraseña";
  else if (!regex.test(form.password))
    error.password =
      "La contraseña debe contener de 6 a 10 caracteres y al menos 1 número";
  else error.password = "";

  return error;
};
export default validation;
