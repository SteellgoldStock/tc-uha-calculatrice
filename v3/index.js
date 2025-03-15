let input = "";
let previousExpression = "";
let hasOpenParenthesis = false;
let calculated = false;

const currentInputElement = document.getElementById("current-input");
const previousExpressionElement = document.getElementById("previous-expression");

function updateDisplay() {
	currentInputElement.textContent = input || "0";
	previousExpressionElement.textContent = previousExpression;
}

function handleNumberInput(num) {
	if (calculated) {
	  input = num;
		previousExpression = "";
		calculated = false;
	} else {
	  input += num;
	}
	updateDisplay();
}

function handleOperatorInput(operator) {
	if (calculated) {
	  input += operator;
		previousExpression = "";
		calculated = false;
	} else {
	  const lastChar = input.slice(-1);

    if (["+", "-", "×", "÷"].includes(lastChar)) {
		  input = input.slice(0, -1) + operator;
		} else {
		  input += operator;
		}
	}

  updateDisplay();
}

function handleParenthesis() {
	if (calculated) {
	  input = "(";
		previousExpression = "";
		calculated = false;
		hasOpenParenthesis = true;
	} else if (!hasOpenParenthesis) {
	  if (input === "") {
		  input = "(";
		} else {
			const lastChar = input.slice(-1);

      if (lastChar !== "" && !["+", "-", "×", "÷", "("].includes(lastChar)) {
		    input += "×(";
			} else {
			  input += "(";
			}
		}

    hasOpenParenthesis = true;
	} else {
	  const lastChar = input.slice(-1);

    if (!["+", "-", "×", "÷"].includes(lastChar)) {
		  input += ")";
			hasOpenParenthesis = false;
		}
	}

  updateDisplay();
}

function handleClear() {
	input = "";
	previousExpression = "";
	hasOpenParenthesis = false;
	calculated = false;
	updateDisplay();
}

function handleDelete() {
	if (calculated) {
	  input = "";
		previousExpression = "";
		calculated = false;
	} else {
	  input = input.slice(0, -1);

    const openCount = (input.match(/\(/g) || []).length;
		const closeCount = (input.match(/\)/g) || []).length;

    hasOpenParenthesis = openCount > closeCount;
	}

  updateDisplay();
}

function calculateResult() {
	if (input === "") return;

	try {
	  let expression = input;
		if (hasOpenParenthesis) {
		  expression += ")";
			hasOpenParenthesis = false;
		}

		expression = expression.replace(/×/g, "*").replace(/÷/g, "/");
		const calculatedResult = eval(expression).toString();

		previousExpression = input + (hasOpenParenthesis ? ")" : "");
		input = calculatedResult;
		calculated = true;
	} catch (error) {
	  previousExpression = input;
		input = "Error";
		calculated = true;
	}

  updateDisplay();
}

document.addEventListener("keydown", function(event) {
	const key = event.key;

  if (key.startsWith("F")) return;

	if (/[0-9]/.test(key)) handleNumberInput(key);
	else if (key === "+" || key === "-" || key === "*" || key === "/") handleOperatorInput(key === "*" ? "×" : key === "/" ? "÷" : key);
	else if (key === "(" || key === ")") handleParenthesis();
	else if (key === "Enter") calculateResult();
	else if (key === "Backspace") handleDelete();
	else if (key === "Escape") handleClear();
});
