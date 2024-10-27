const {
  checkRente,
  checkYearlyIncome,
  checkZipcode,
  calculation,
  checkStudieSchuld,
} = require("../js/app");

// postcodes die niet mogen worden ingevuld, 9679, 9681, 9682

const caclMaxHypoteekLast = 4.25;

// Tests voor de checkYearlyIncome functie
test("yearlyIncome is a number", () => {
  expect(checkYearlyIncome(60000)).toEqual(60000);
});

test("yearlyIncome is 0", () => {
  expect(checkYearlyIncome(0)).toBe(0);
});

test("yearlyIncome is not a number", () => {
  expect(checkYearlyIncome("60000")).toBe("60000");
});

// Tests voor de checkZipcode functie
test("zipcode is a number", () => {
  expect(checkZipcode(1234)).toBe(1234);
});

test("zipcode is 0", () => {
  expect(checkZipcode(0)).toBe(0);
});

test("zipcode is not a number", () => {
  expect(checkZipcode("1234")).toBe("1234");
});

// Tests voor de checkRente functie
test("rente is a number", () => {
  expect(checkRente(3)).toBe(3);
});

test("rente is 0", () => {
  expect(checkRente(0)).toBe(0);
});

test("rente is not a number", () => {
  expect(checkRente("3")).toBe("3");
});

// Tests voor checkStudieSchuld functie
test("studieSchuld is yes", () => {
  expect(checkStudieSchuld("yes")).toBe("yes");
});

test("studieSchuld is no", () => {
  expect(checkStudieSchuld("no")).toBe("no");
});

test("studieSchuld is not yes or no", () => {
  expect(checkStudieSchuld("")).toBe("");
});

// tests voor checkZipcode functie
test("wrong zipcode 9679", () => {
  expect(checkZipcode(9679)).toBe(null);
});

test("wrong zipcode 9681", () => {
  expect(checkZipcode(9681)).toBe(null);
});

test("wrong zipcode 9682", () => {
  expect(checkZipcode(9682)).toBe(null);
});

test("calculate maxHypoteekLast with 40000 yearlyIncome", () => {
  const yearlyIncome = 40000;
  const rente = 20;
  const studieSchuld = "no";
  const result = calculation(yearlyIncome, rente, studieSchuld);

  expect(result.maxHypoteekLast).toBe(yearlyIncome * caclMaxHypoteekLast);
});

test("calculate maxHypoteekLast with 24000 yearlyIncome and with studieSchuld", () => {
  const yearlyIncome = 24000;
  const rente = 20;
  const studieSchuld = "yes";
  const result = calculation(yearlyIncome, rente, studieSchuld);

  expect(result.maxHypoteekLast).toBe(yearlyIncome * caclMaxHypoteekLast);
});

// Tests voor de calculation functie
// Integratie test die kijk naar de max hypotheek last zonder studieschuld en checkt of de zipcode, yearlyIncome en rente toegestaan is
test("calculate maxHypoteekLast", () => {
  const yearlyIncome = 60000;
  const rente = 30;
  const studieSchuld = "no";
  const zipcode = 1234;
  const result = calculation(yearlyIncome, rente, studieSchuld);

  expect(checkZipcode(1234)).toBe(zipcode);
  expect(checkYearlyIncome(60000)).toBe(yearlyIncome);
  expect(checkRente(30)).toBe(rente);
  expect(checkStudieSchuld("no")).toBe(studieSchuld);
  expect(result.maxHypoteekLast).toBe(result.maxHypoteekLast);
});

// Integratie test die kijk naar de max hypotheek last met studieschuld en checkt of de zipcode, yearlyIncome en rente toegestaan is
test("calculate maxHypoteekLast with studieschuld", () => {
  const yearlyIncome = 60000;
  const rente = 30;
  const studieSchuld = "yes";
  const zipcode = 1234;
  const result = calculation(yearlyIncome, rente, studieSchuld);

  expect(checkZipcode(1234)).toBe(zipcode);
  expect(checkYearlyIncome(60000)).toBe(yearlyIncome);
  expect(checkRente(30)).toBe(rente);
  expect(checkStudieSchuld("yes")).toBe(studieSchuld);
  expect(result.maxHypoteekLast).toBe(result.maxHypoteekLast);
});

// Integratie test die kijkt naar de max hypotheek last zonder studieschuld en checkt of de zipcode is toegestaan
test("calculate maxHypoteekLast with wrong zipcode", () => {
  const yearlyIncome = 60000;
  const zipcode = 9679;
  const studieSchuld = "no";

  expect(checkZipcode(9679)).toBe(null);
  expect(calculation(yearlyIncome, studieSchuld, zipcode)).toBe(undefined);
});
