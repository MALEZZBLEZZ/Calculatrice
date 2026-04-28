function calculateExpression(expression) {
  return Function('"use strict"; return (' + expression + ')')();
}

test("addition", () => {
  expect(calculateExpression("2+3")).toBe(5);
});

test("soustraction", () => {
  expect(calculateExpression("10-4")).toBe(6);
});

test("multiplication", () => {
  expect(calculateExpression("6*7")).toBe(42);
});

test("division", () => {
  expect(calculateExpression("20/5")).toBe(4);
});

test("racine carrée", () => {
  expect(calculateExpression("Math.sqrt(16)")).toBe(4);
});

test("puissance", () => {
  expect(calculateExpression("2**3")).toBe(8);
});

test("log base 10", () => {
  expect(calculateExpression("Math.log10(100)")).toBe(2);
});

test("sinus", () => {
  expect(calculateExpression("Math.sin(0)")).toBe(0);
});
