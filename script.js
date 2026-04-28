const display = document.getElementById("display");

function add(value) {
  display.value += value;
}

function clearDisplay() {
  display.value = "";
}

function deleteLast() {
  display.value = display.value.slice(0, -1);
}

function addFunction(name) {
  if (name === "sin") {
    display.value += "Math.sin(";
  } else if (name === "cos") {
    display.value += "Math.cos(";
  } else if (name === "tan") {
    display.value += "Math.tan(";
  } else if (name === "sqrt") {
    display.value += "Math.sqrt(";
  } else if (name === "log") {
    display.value += "Math.log10(";
  } else if (name === "ln") {
    display.value += "Math.log(";
  }
}

function calculate() {
  try {
    const result = Function('"use strict"; return (' + display.value + ')')();
    display.value = result;
  } catch {
    display.value = "Erreur";
  }
}
