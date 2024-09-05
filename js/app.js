"use strict";

const submit = document.getElementById("submit");
const rentejaarError = document.getElementById("rentejaar-error");
const maxTimeYearIncome = 4.25;

let yearlyIncome = 0;
let studieSchuld = 0;
let maxHypoteekLast = 0;
let renteMonth = 0;
let rentePercentage = 0;
let aflossing = 0;
let monthlyPay = 0;
let totalRenteYear = 0;
let rente = 0;

// Error messages
const errorYearlyIncome = document.querySelector(".yearly");
const errorWrongZipcode = document.querySelector(".wrong-zipcode");
const errorNoZipcode = document.querySelector(".no-zipcode");
const closeErrorMsg = document.getElementById("close-error-msg");

// rentepercentages per jaar
const rentePerMonth = {
  1: 0.02 / 12,
  5: 0.03 / 12,
  10: 0.035 / 12,
  20: 0.045 / 12,
  30: 0.05 / 12,
};

const monthRente = {
  1: 12,
  5: 60,
  10: 120,
  20: 240,
  30: 360,
};

const checkYearlyIncome = function (monthlyIncome) {
  if (monthlyIncome === 0 || isNaN(monthlyIncome)) {
    errorYearlyIncome.classList.remove("hidden");
    setTimeout(() => {
      errorYearlyIncome.classList.add("hidden");
    }, 1500);
  }
};

/* 
Check voor zipcode of er iets is ingevuld en kijkt of een van de 3 foute zipcodes is ingevuld
dan geeft het een error message die erbij hoort
*/
const checkZipcode = function (zipcode) {
  if (zipcode === 0 || isNaN(zipcode)) {
    errorNoZipcode.classList.remove("hidden");
    setTimeout(() => {
      errorNoZipcode.classList.add("hidden");
    }, 1500);
  } else if (zipcode === 9679 || zipcode === 9681 || zipcode === 9682) {
    errorWrongZipcode.classList.remove("hidden");
    setTimeout(() => {
      errorWrongZipcode.classList.add("hidden");
    }, 1500);
  }
};

// berekening van de rente, maximale te lenen bedrag en aflossing en hoeveel dat over de jares is in maanden
const calculation = function (yearlyIncome, renteInput, studieSchuld) {
  let maxHypoteekLast = yearlyIncome * maxTimeYearIncome;

  if (studieSchuld === "yes") {
    maxHypoteekLast *= 0.75;
  }

  const rentePercentage = rentePerMonth[renteInput];
  const renteMonth = monthRente[renteInput];
  const rente = maxHypoteekLast * rentePercentage;
  const aflossing = maxHypoteekLast / monthRente[renteInput];
  const monthlyPay = rente + aflossing;
  const totalRenteYear = monthlyPay * renteMonth;

  return {
    yearlyIncome,
    studieSchuld,
    maxHypoteekLast,
    renteMonth,
    rentePercentage,
    aflossing,
    monthlyPay,
    totalRenteYear,
    rente,
  };
};

const showResult = function (result) {
  const results = document.getElementById("results");
  results.classList.remove("hidden");

  document.getElementById("result-yearly-income").textContent =
    result.yearlyIncome;
  document.getElementById("result-studieschuld").textContent =
    result.studieSchuld === "yes" ? "Ja" : "Nee";
  document.getElementById("result-max-hypotheek").textContent =
    result.maxHypoteekLast.toFixed(2);
  document.getElementById("result-rentejaar").textContent =
    result.renteMonth + " maanden";
  document.getElementById("result-rente-percentage").textContent =
    (result.rentePercentage * 12 * 100).toFixed(2) + "%";
  document.getElementById("result-rente-maand").textContent =
    result.rente.toFixed(2);
  document.getElementById("result-aflossing").textContent =
    result.aflossing.toFixed(2);
  document.getElementById("result-total-monthly").textContent =
    result.monthlyPay.toFixed(2);
  document.getElementById("result-total-year").textContent =
    result.totalRenteYear.toFixed(2);
};

submit.addEventListener("click", function () {
  const yearlyIncome = Number(document.getElementById("yearly-income").value);
  const zipcode = Number(document.getElementById("zipcode").value);
  const rente = Number(document.getElementById("rentejaar").value);
  const studieSchuld = document.getElementById("studieschuld").value;

  checkYearlyIncome(yearlyIncome);
  checkZipcode(zipcode);
  const result = calculation(yearlyIncome, rente, studieSchuld);
  showResult(result);
});
