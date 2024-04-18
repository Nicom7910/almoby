let form = document.querySelector("form");
let userName = document.querySelector("#username");
let email = document.querySelector("#email");
let password = document.querySelector("#password");
let confirmPassword = document.querySelector("#password-validate");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");

const termsCheck = document.getElementById("terms-check");
const submitBtn = document.getElementById("btncheck");
termsCheck.addEventListener("change", function () {
  submitBtn.disabled = !this.checked;
});

function showModal() {
  modal.style.display = "block";
  overlay.style.display = "block";
  setTimeout(function () {
    modal.style.display = "none";
    overlay.style.display = "none";
    form.reset();
  }, 3000);
}

function setErrorFor(input, message) {
  let formControl = input.parentElement;
  formControl.className = "form-input error";
  let small = formControl.querySelector("small");
  small.innerText = message;
}

function setSuccessFor(input) {
  let formControl = input.parentElement;
  formControl.className = "form-input success";
}

function isEmail(email) {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

document.getElementById("form").addEventListener("submit", function (event) {
  event.preventDefault();
  let userNameValue = userName.value.trim();
  let emailValue = email.value.trim();
  let passwordValue = password.value.trim();
  let confirmPasswordValue = confirmPassword.value.trim();

  var allValid = true;
  if (userNameValue === "") {
    setErrorFor(userName, "Name cannot be blank");
    allValid = false;
  } else {
    setSuccessFor(userName);
  }

  if (emailValue === "") {
    setErrorFor(email, "Email cannot be blank");
    allValid = false;
  } else if (!isEmail(emailValue)) {
    setErrorFor(email, "Email is not valid");
    allValid = false;
  } else {
    setSuccessFor(email);
  }

  if (passwordValue === "") {
    setErrorFor(password, "Password cannot be blank");
    allValid = false;
  } else if (passwordValue.length < 6 || passwordValue.length > 30) {
    setErrorFor(password, "Password length should be between 6 and 30");
    allValid = false;
  } else {
    setSuccessFor(password);
  }

  if (confirmPasswordValue === "") {
    setErrorFor(confirmPassword, "Confirm Password cannot be blank");
    allValid = false;
  } else if (confirmPasswordValue !== passwordValue) {
    setErrorFor(confirmPassword, "Confirm password not matched with password");
    allValid = false;
  } else {
    setSuccessFor(confirmPassword);
  }

  if (termsCheck.checked && allValid) {
    showModal();
  }
});
