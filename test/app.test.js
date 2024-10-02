const {
  checkRente,
  checkYearlyIncome,
  checkZipcode,
  calculation,
} = require("../js/app");

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
test("calculate maxHypoteekLast", () => {
  const result = calculation(60000, 30, "no");
  expect(result.maxHypoteekLast).toBe(255000);
});
