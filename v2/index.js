document.addEventListener("DOMContentLoaded", () => {
  const screenTextTop = document.getElementById("top-text");
  const screenTextBottom = document.getElementById("bottom-text");

  let currentInput = "";
  let previousInput = "";
  let operator = null;

  const updateScreen = () => {
    screenTextBottom.innerText = currentInput || "0";
    if (operator) {
      screenTextTop.innerText = `${previousInput} ${operator}`;
    } else {
      screenTextTop.innerText = previousInput;
    }
  };

  const handleNumberClick = (number) => {
    if (currentInput === "0" || currentInput === "") {
      currentInput = number;
    } else {
      currentInput += number;
    }
    updateScreen();
  };

  const handleOperatorClick = (op) => {
    if (currentInput === "") return;
    if (previousInput === "") {
      previousInput = currentInput;
    } else if (operator) {
      previousInput = calculateResult().toString();
    }
    operator = op;
    currentInput = "";
    updateScreen();
  };

  const calculateResult = () => {
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    if (isNaN(prev) || isNaN(current)) return;
    let result;
    switch (operator) {
      case "+":
        result = prev + current;
        break;
      case "-":
        result = prev - current;
        break;
      case "x":
        result = prev * current;
        break;
      case "/":
        result = prev / current;
        break;
      default:
        return;
    }
    currentInput = result;
    updateScreen();
    operator = null;
    previousInput = "";
  };

  const handleEqualClick = () => {
    calculateResult();
  };

  const handleClear = () => {
    currentInput = "";
    previousInput = "";
    operator = null;
    updateScreen();
  };

  document.querySelectorAll("#btn-number").forEach(button => {
    button.addEventListener("click", () => handleNumberClick(button.innerText));
  });

  document.querySelectorAll("#btn-operator").forEach(button => {
    button.addEventListener("click", () => handleOperatorClick(button.innerText));
  });

  document.getElementById("btn-equal").addEventListener("click", handleEqualClick);

  document.addEventListener("keydown", (event) => {
    const key = event.key;
    if (key >= "0" && key <= "9") {
      handleNumberClick(key);
    } else if (key === "+" || key === "-" || key === "*" || key === "/") {
      handleOperatorClick(key === "*" ? "x" : key);
    } else if (key === "Enter" || key === "=") {
      handleEqualClick();
    } else if (key === "Escape") {
      handleClear();
    }
  });

  updateScreen();
});
