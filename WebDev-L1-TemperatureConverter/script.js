
"use strict";

// Oasis Infobyte — Level 1 Task 3
// Temperature Converter

const form = document.getElementById("converter-form");
const temperatureInput = document.getElementById("temperature");
const fromUnit = document.getElementById("from-unit");
const errorMessage = document.getElementById("error-message");

const celsiusResult = document.getElementById("celsius-result");
const fahrenheitResult = document.getElementById("fahrenheit-result");
const kelvinResult = document.getElementById("kelvin-result");

// Absolute zero is the lowest physically possible temperature.
const ABSOLUTE_ZERO = {
  celsius: -273.15,
  fahrenheit: -459.67,
  kelvin: 0
};

function clearResults() {
  celsiusResult.textContent = "—";
  fahrenheitResult.textContent = "—";
  kelvinResult.textContent = "—";
}

function showError(message) {
  errorMessage.textContent = message;
  errorMessage.hidden = false;
  temperatureInput.setAttribute("aria-invalid", "true");
  clearResults();
}

function clearError() {
  errorMessage.textContent = "";
  errorMessage.hidden = true;
  temperatureInput.removeAttribute("aria-invalid");
}

function formatTemperature(value) {
  // Prevent negative zero from appearing in the results.
  if (Math.abs(value) < 0.0000001) {
    value = 0;
  }

  // Show up to two decimal places without unnecessary zeros.
  return Number(value.toFixed(2)).toLocaleString("en-US", {
    maximumFractionDigits: 2
  });
}

function convertToCelsius(value, unit) {
  switch (unit) {
    case "celsius":
      return value;

    case "fahrenheit":
      return (value - 32) * 5 / 9;

    case "kelvin":
      return value - 273.15;

    default:
      throw new Error("Unsupported temperature unit.");
  }
}

function convertTemperature(event) {
  event.preventDefault();
  clearError();
  clearResults();

  const rawInput = temperatureInput.value.trim();
  const selectedUnit = fromUnit.value;

  // Check for empty input.
  if (rawInput === "") {
    showError("Please enter a temperature value.");
    return;
  }

  const inputValue = Number(rawInput);

  // Reject invalid or non-finite values.
  if (!Number.isFinite(inputValue)) {
    showError("Please enter a valid numeric temperature.");
    return;
  }

  // Reject temperatures below absolute zero.
  if (inputValue < ABSOLUTE_ZERO[selectedUnit]) {
    const unitLabels = {
      celsius: "°C",
      fahrenheit: "°F",
      kelvin: "K"
    };

    showError(
      `Temperature cannot be below absolute zero (${ABSOLUTE_ZERO[selectedUnit]} ${unitLabels[selectedUnit]}).`
    );
    return;
  }

  // Convert the input to Celsius first.
  const celsius = convertToCelsius(inputValue, selectedUnit);

  // Calculate Fahrenheit and Kelvin.
  const fahrenheit = (celsius * 9 / 5) + 32;
  const kelvin = celsius + 273.15;

  // Display the converted results.
  celsiusResult.textContent = formatTemperature(celsius);
  fahrenheitResult.textContent = formatTemperature(fahrenheit);
  kelvinResult.textContent = formatTemperature(kelvin);
}

// Convert when the form is submitted.
form.addEventListener("submit", convertTemperature);

// Reset the form and results.
form.addEventListener("reset", () => {
  clearError();
  clearResults();
});

// Clear errors when the user changes the input.
temperatureInput.addEventListener("input", clearError);
fromUnit.addEventListener("change", clearError);

// Initial display.
clearResults();
clearError();
