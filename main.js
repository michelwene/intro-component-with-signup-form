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
      fname: {
        valueMissing: "First name cannot be empty",
      },
      lname: {
        valueMissing: "Last name cannot be empty",
      },
      email: {
        valueMissing: "Looks like this is not an email",
        typeMismatch: "email@example/com",
      },
      password: {
        valueMissing: "Password cannot be empty",
      },
    };

    return messages[field.name][typeError];
  }

  function setCustomMessage(message) {
    const spanError = field.parentNode.querySelector("span.error");
    const inputEmail = document.getElementById("email");

    if (message) {
      spanError.classList.add("active");
      spanError.innerHTML = message;

      if (message == "Looks like this is not an email") {
        inputEmail.placeholder= "email@example/com";
        field.style.placeholder = "var(--cor-vermelho)";
      }
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
