const formEl = document.querySelector(".signup-form form");
const firstNameEl = formEl.querySelector("#first-name");
const lastNameEl = formEl.querySelector("#last-name");
const emailEl = formEl.querySelector("#email");
const passwordEl = formEl.querySelector("#password");

const isReauiqred = (value) => (value === "" ? false : true);

const isEmailValid = (email) => {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

const isPasswordSecure = (password) => {
  const re = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})",
  );
  return re.test(password);
};

const showError = (element, message) => {
  const formFieldEl = element.closest(".signup-form__field");
  const messageEl = formFieldEl.querySelector("small");

  formFieldEl.classList.add("error");
  messageEl.innerText = message;
};

const hideError = (element) => {
  const formFieldEl = element.closest(".signup-form__field");
  const messageEl = formFieldEl.querySelector("small");

  formFieldEl.classList.remove("error");
  messageEl.innerText = "";
};

const checkFirstName = () => {
  let valid = false;
  const firstName = firstNameEl.value.trim();

  if (!isReauiqred(firstName)) {
    showError(firstNameEl, "First name cannot be empty");
  } else {
    hideError(firstNameEl);
    valid = true;
  }

  return valid;
};

const checkLastName = () => {
  let valid = false;
  const lastName = lastNameEl.value.trim();

  if (!isReauiqred(lastName)) {
    showError(lastNameEl, "Last name cannot be empty");
  } else {
    hideError(lastNameEl);
    valid = true;
  }

  return valid;
};

const checkEmail = () => {
  let valid = false;
  const email = emailEl.value.trim();

  if (!isReauiqred(email)) {
    showError(emailEl, "Email cannot be empty");
  } else if (!isEmailValid(email)) {
    showError(emailEl, "Email is not valid");
  } else {
    hideError(emailEl);
    valid = true;
  }

  return valid;
};

const checkPassword = () => {
  let valid = false;
  const password = passwordEl.value.trim();

  if (!isReauiqred(password)) {
    showError(passwordEl, "Password cannot be empty");
  } else if (!isPasswordSecure(password)) {
    showError(passwordEl, "Password is not secure");
  } else {
    hideError(passwordEl);
    valid = true;
  }

  return valid;
};

const debounce = (fn, delay = 500) => {
  let timeoutId;
  return function (...args) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      fn.apply(null, args);
    }, delay);
  };
};

formEl.addEventListener("submit", (event) => {
  event.preventDefault();

  const isFirstNameValid = checkFirstName();
  const isLastNameValid = checkLastName();
  const isEmailValid = checkEmail();
  const isPasswordValid = checkPassword();

  const isFormValid =
    isFirstNameValid && isLastNameValid && isEmailValid && isPasswordValid;

  if (isFormValid) {
    alert("Form is valid");
    formEl.reset();
  }
});

formEl.addEventListener(
  "input",
  debounce((event) => {
    switch (event.target) {
      case emailEl:
        checkEmail(event.target.value);
        break;
      case passwordEl:
        checkPassword(event.target.value);
        break;
      case firstNameEl:
        checkFirstName(event.target.value);
        break;
      case lastNameEl:
        checkLastName(event.target.value);
        break;
    }
  }),
);
