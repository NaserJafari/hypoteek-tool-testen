"use strict";

const input = document.getElementById("monthly-income");
const submit = document.getElementById("submit");
const rentejaarError = document.getElementById("rentejaar-error");

const checkInput = function () {
  if (
    Number(input.value) !== 1 &&
    Number(input.value) !== 5 &&
    Number(input.value) !== 10 &&
    Number(input.value) !== 20 &&
    Number(input.value) !== 30
  ) {
    rentejaarError.classList.remove("rentejaar-error");
    setTimeout(() => {
      rentejaarError.classList.add("rentejaar-error");
    }, 1000);
  }
};

submit.addEventListener("click", function () {
  console.log(Number(input.value));
  checkInput();
});
