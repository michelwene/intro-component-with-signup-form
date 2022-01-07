const fields = document.querySelectorAll("[required]");

function ValidateField(field) {
  // logica para verificar se existem erros
  function verifyErrors() {
    let foundError = false;

    for (let error in field.validity) {
      // se não for customError
      // então verifica se tem erro
      if (field.validity[error] && !field.validity.valid) {
        foundError = error;
      }
    }
    return foundError;
  }

  function customMessage(typeError) {
    const messages = {
      text: {
        valueMissing: "Name cannot be empty",
      },
      email: {
        valueMissing: "Looks like this is not an email",
        typeMismatch: "Please fill in a valid email 'email@example/com'",
      },
      password: {
        valueMissing: "Password cannot be empty",
      },
    };

    return messages[field.type][typeError];
  }

  function setCustomMessage(message) {
    const spanError = field.parentNode.querySelector("span.error");

    if (message) {
      spanError.classList.add("active");
      spanError.innerHTML = message;
    } else {
      spanError.classList.remove("active");
      spanError.innerHTML = "";
    }
  }

  return function () {
    const error = verifyErrors();

    if (error) {
      const message = customMessage(error);
      field.style.background =
        "#fff url(../assets/images/icon-error.svg) no-repeat 95% center";
      field.style.border = "2px solid var(--cor-vermelho)";
      setCustomMessage(message);
    } else {
      field.style.background = "none";
      field.style.border = "2px solid var(--cor-verde)";
      setCustomMessage();
    }
  };
}

function customValidation(event) {
  const field = event.target;
  const validation = ValidateField(field);

  console.log(field.validity);
  validation();
}

for (const field of fields) {
  field.addEventListener("invalid", (event) => {
    // eliminar o bubble
    event.preventDefault();

    customValidation(event);
  });
  field.addEventListener("blur", customValidation);
}

document.querySelector("form").addEventListener("submit", (event) => {
  console.log("enviar o formulário");

  // não vai enviar o formulário
  event.preventDefault();
});
