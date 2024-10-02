"use strict";

const submit = document.getElementById("submit");
const maxTimeYearIncome = 4.25;

// Error messages
const errorYearlyIncome = document.querySelector(".yearly");
const errorWrongZipcode = document.querySelector(".wrong-zipcode");
const errorNoZipcode = document.querySelector(".no-zipcode");
const errorRente = document.querySelector(".rente");
const errorStudieSchuld = document.querySelector(".studieschuld");

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

const checkYearlyIncome = function (yearlyIncome) {
  if (yearlyIncome === 0 || isNaN(yearlyIncome)) {
    errorYearlyIncome.classList.remove("hidden");
    setTimeout(() => {
      errorYearlyIncome.classList.add("hidden");
    }, 1500);
  }

  return yearlyIncome;
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
    errorWrongZipcode?.classList.remove("hidden");
    setTimeout(() => {
      errorWrongZipcode.classList.add("hidden");
    }, 1500);

    return null;
  }

  return zipcode;
};

const checkRente = function (rente) {
  if (rente === 0 || isNaN(rente)) {
    errorRente.classList.remove("hidden");
    setTimeout(() => {
      errorRente.classList.add("hidden");
    }, 1500);
  }

  return rente;
};

// check of er een studieschuld is ingevuld
const checkStudieSchuld = function (studieSchuld) {
  if (studieSchuld !== "yes" && studieSchuld !== "no") {
    errorStudieSchuld.classList.remove("hidden");
    setTimeout(() => {
      errorStudieSchuld.classList.add("hidden");
    }, 1500);
  }
};

// berekening van de rente, maximale te lenen bedrag en aflossing en hoeveel dat over de jares is in maanden
const calculation = function (yearlyIncome, renteInput, studieSchuld, zipcode) {
  if (zipcode === 9679 || zipcode === 9681 || zipcode === 9682) {
    return;
  }
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
    zipcode,
  };
};

const showResult = function (result) {
  const results = document.getElementById("results");
  const resultsTitle = document.getElementById("results-title");
  results.classList.remove("hidden");
  resultsTitle.classList.remove("hidden");

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

submit?.addEventListener("click", function () {
  const yearlyIncome = Number(document.getElementById("yearly-income").value);
  const zipcode = Number(document.getElementById("zipcode").value);
  const rente = Number(document.getElementById("rentejaar").value);
  const studieSchuld = document.getElementById("studieschuld").value;

  checkYearlyIncome(yearlyIncome);
  const validZipcode = checkZipcode(zipcode);
  checkRente(rente);
  checkStudieSchuld(studieSchuld);

  if (
    yearlyIncome === 0 ||
    isNaN(yearlyIncome) ||
    validZipcode === null ||
    zipcode === 0 ||
    isNaN(zipcode)
  ) {
    return;
  }

  const result = calculation(yearlyIncome, rente, studieSchuld, zipcode);
  showResult(result);
});

const reset = document.getElementById("reset");
reset?.addEventListener("click", function () {
  document.getElementById("yearly-income").value = "";
  document.getElementById("zipcode").value = "";
  document.getElementById("rentejaar").selectedIndex = 0;
  document.getElementById("studieschuld").selectedIndex = 0;

  const results = document.getElementById("results");
  const resultsTitle = document.getElementById("results-title");
  results.classList.add("hidden");
  resultsTitle.classList.add("hidden");
});

module.exports = {
  checkYearlyIncome,
  checkZipcode,
  checkRente,
  checkStudieSchuld,
  calculation,
  showResult,
};
