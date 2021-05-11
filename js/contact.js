const form = document.querySelector("#form");
const firstName = document.querySelector("#name");
const nameError = document.querySelector("#nameError");
const email = document.querySelector("#email");
const emailError = document.querySelector("#emailError");
const subject = document.querySelector("#subject");
const subjectError = document.querySelector("#subjectError");
const message = document.querySelector("#message");
const messageError = document.querySelector("#messageError");
const thankyouMessage = document.querySelector("#formCompleted");

function formValidation(event) {
  let counter = 0;
  event.preventDefault();

  if (characterLength(firstName.value, 6)) {
    nameError.style.display = "none";
    counter += 1;
  } else {
    nameError.style.display = "block";
  }

  if (emailValidation(email.value) & (email.value.trim().length > 0)) {
    emailError.style.display = "none";
    counter += 1;
  } else {
    emailError.style.display = "block";
  }

  if (characterLength(subject.value, 16)) {
    subjectError.style.display = "none";
    counter += 1;
  } else {
    subjectError.style.display = "block";
  }

  if (characterLength(message.value, 26)) {
    messageError.style.display = "none";
    counter += 1;
  } else {
    messageError.style.display = "block";
  }
  if (counter === 4) {
    thankyouMessage.style.display = "flex";
  }
}

form.addEventListener("submit", formValidation);

const characterLength = function (value, characters) {
  if (value.trim().length >= characters) {
    return true;
  } else {
    return false;
  }
};

function emailValidation(email) {
  const regEx = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/;
  const emailMatch = regEx.test(email);
  return emailMatch;
}
