const calc = import("../js/app.js");

// test the checkYearlyIncome function with parameters, 60000, 5, yes || no
test("checkYearlyIncome", () => {
  expect(calc.checkYearlyIncome(60000)).toBe("yes");
  expect(calc.checkYearlyIncome(5)).toBe("no");
  expect(calc.checkYearlyIncome("yes")).toBe("no");
});
