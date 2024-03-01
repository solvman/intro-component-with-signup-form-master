const formEl = document.querySelector("signup-form");
const firstNameEl = formEl.querySelector("first-name");
const lastNameEl = formEl.querySelector("last-name");
const emailEl = formEl.querySelector("email");
const passwordEl = formEl.querySelector("password");

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
  const parentEl = element.closest(".signup-form__field");
  const messageEl = parentEl.querySelector("small");

  parentEl.classList.add("error");
  messageEl.innerText = message;
};

const hideError = (element) => {
  const parentEl = element.closest(".signup-form__field");
  const messageEl = parentEl.querySelector("small");

  parentEl.classList.remove("error");
  messageEl.innerText = "";
};

const checkEmail = (email) => {
  let valid = false;
  if (!isReauiqred(email)) {
    showError(email, "Email cannot be empty");
  } else if (!isEmailValid(email)) {
    showError(email, "Email is not valid");
  } else {
    hideError(email);
    valid = true;
  }

  return valid;
};

const checkPassword = (password) => {
  let valid = false;
  if (!isReauiqred(password)) {
    showError(password, "Password cannot be empty");
  } else if (!isPasswordSecure(password)) {
    showError(password, "Password is not secure");
  } else {
    hideError(password);
    valid = true;
  }

  return valid;
};

const checkName = (firstName) => {
  let valid = false;
  if (!isReauiqred(firstName)) {
    showError(firstName, "First name cannot be empty");
  } else {
    hideError(firstName);
    valid = true;
  }

  return valid;
};

const checkLastName = (lastName) => {
  let valid = false;
  if (!isReauiqred(lastName)) {
    showError(lastName, "Last name cannot be empty");
  } else {
    hideError(lastName);
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

  const isEmailValid = checkEmail(emailEl.value);
  const isPasswordValid = checkPassword(passwordEl.value);
  const isFirstNameValid = checkName(firstNameEl.value);
  const isLastNameValid = checkLastName(lastNameEl.value);

  const isFormValid =
    isEmailValid && isPasswordValid && isFirstNameValid && isLastNameValid;

  if (isFormValid) {
    alert("Form is submitted");
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
        checkName(event.target.value);
        break;
      case lastNameEl:
        checkLastName(event.target.value);
        break;
    }
  }),
);
