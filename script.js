const display = document.getElementById("display");
const buttons = document.querySelectorAll(".buttons button");
const OPERATORS = ["+", "-", "x", "/", "%"];
function clearDisplay() {
  display.value = "0";
}
function deleteLastChar() {
  display.value = display.value.slice(0, -1) || "0";
}
function isOperator(value) {
  return OPERATORS.includes(value);
}
function getLastChar() {
  return display.value.slice(-1);
}
function evaluateExpression() {
  try {
    let expression = display.value;
    while (OPERATORS.includes(expression.slice(-1)) || expression.endsWith(".")) {
      expression = expression.slice(0, -1);
    }
    expression = expression
      .replace(/x/g, "*")
      .replace(/%/g, "/100");
    if (expression === "") {
      display.value = "0";
      return;
    }
    display.value = eval(expression);
  } catch {
    display.value = "Error";
  }
}
function preventInvalidInput(value) {
  const lastChar = getLastChar();
  if (isOperator(value) && isOperator(lastChar)) return true;
  if (value === "." && lastChar === ".") return true;
  return false;
}
function updateDisplay(value) {
  if (display.value === "0" && value !== "." && !isOperator(value)) {
    display.value = value;
  } else {
    display.value += value;
  }
}
buttons.forEach(button => {
  button.addEventListener("click", () => {
    const value = button.textContent;
    if (value === "C") {
      clearDisplay();
      return;
    }
    if (value === "del") {
      deleteLastChar();
      return;
    }
    if (value === "Enter") {
      evaluateExpression();
      return;
    }
    if (preventInvalidInput(value)) return;
    updateDisplay(value);
  });
});
