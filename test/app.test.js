const {
  checkRente,
  checkYearlyIncome,
  checkZipcode,
  calculation,
} = require("../js/app");

// postcodes die niet mogen worden ingevuld, 9679, 9681, 9682

const caclMaxHypoteekLast = 4.25;

// Tests voor de checkYearlyIncome functie
test("yearlyIncome is a number", () => {
  expect(checkYearlyIncome(60000)).toEqual(60000);
});

test("yearlyIncome is not a number", () => {
  expect(checkYearlyIncome("60000")).toBe("60000");
});

// Tests voor de checkZipcode functie
test("zipcode is a number", () => {
  expect(checkZipcode(1234)).toBe(1234);
});

test("zipcode is not a number", () => {
  expect(checkZipcode("1234")).toBe("1234");
});

// Tests voor de checkRente functie
test("rente is a number", () => {
  expect(checkRente(3)).toBe(3);
});

test("rente is not a number", () => {
  expect(checkRente("3")).toBe("3");
});

// Tests voor de calculation functie
// Integratie test die kijk naar de max hypotheek last zonder studieschuld en checkt of de zipcode, yearlyIncome en rente toegestaan is
test("calculate maxHypoteekLast", () => {
  const yearlyIncome = 60000;
  const rente = 30;
  const studieSchuld = "no";
  const zipcode = 1234;
  const result = calculation(yearlyIncome, rente, studieSchuld);
  let resultMaxHypoteekLast = yearlyIncome * caclMaxHypoteekLast;

  expect(checkZipcode(1234)).toBe(zipcode);
  expect(checkYearlyIncome(60000)).toBe(yearlyIncome);
  expect(checkRente(30)).toBe(rente);
  expect(result.maxHypoteekLast).toBe(resultMaxHypoteekLast);
});

// Integratie test die kijk naar de max hypotheek last met studieschuld en checkt of de zipcode, yearlyIncome en rente toegestaan is
test("calculate maxHypoteekLast with studieschuld", () => {
  const yearlyIncome = 60000;
  const rente = 30;
  const studieSchuld = "yes";
  const zipcode = 1234;
  const result = calculation(yearlyIncome, rente, studieSchuld);
  let resultMaxHypoteekLast = yearlyIncome * caclMaxHypoteekLast;

  expect(checkZipcode(1234)).toBe(zipcode);
  expect(checkYearlyIncome(60000)).toBe(yearlyIncome);
  expect(checkRente(30)).toBe(rente);
  expect(result.maxHypoteekLast).toBe(resultMaxHypoteekLast);
});

// Integratie test die kijkt naar de max hypotheek last zonder studieschuld en checkt of de zipcode is toegestaan
test("calculate maxHypoteekLast with wrong zipcode", () => {
  const yearlyIncome = 60000;
  const zipcode = 9679;
  const studieSchuld = "no";

  expect(checkZipcode(9679)).toBe(null);
  expect(calculation(yearlyIncome, studieSchuld, zipcode)).toBe(undefined);
});
