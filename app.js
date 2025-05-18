const form = document.querySelector("form");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  clearErrors();

  const inputs = form.querySelectorAll("input");
  const day = inputs[0].value.trim();
  const month = inputs[1].value.trim();
  const year = inputs[2].value.trim();

  let valid = true;

  if (!isValidYear(year)) {
    showError("year", "Invalid year");
    valid = false;
  }
  if (!isValidMonth(month)) {
    showError("month", "Invalid month");
    valid = false;
  }
  if (!isValidDay(day, month)) {
    showError("day", "Invalid day");
    valid = false;
  }

  if (!valid) {
    clearAgeDisplay();
    return;
  }

  calculateAge(day, month, year);
});

function showError(id, message) {
  document.getElementById(id + "-error").textContent = message;
}

function clearErrors() {
  ["day", "month", "year"].forEach(id => {
    document.getElementById(id + "-error").textContent = "";
  });
}

function clearAgeDisplay() {
  document.querySelector(".years").textContent = "";
  document.querySelector(".months").textContent = "";
  document.querySelector(".days").textContent = "";
}

function isValidYear(year) {
  const y = parseInt(year);
  return y > 1900 && y <= new Date().getFullYear();
}

function isValidMonth(month) {
  const m = parseInt(month);
  return m >= 1 && m <= 12;
}

function isValidDay(day, month) {
  const d = parseInt(day);
  const m = parseInt(month);
  if (isNaN(d) || d < 1) return false;
  if ([4, 6, 9, 11].includes(m)) return d <= 30;
  if (m === 2) return d <= 29; 
  return d <= 31;
}

function calculateAge(day, month, year) {
  const birthDate = new Date(year, month - 1, day);
  const now = new Date();

  let years = now.getFullYear() - birthDate.getFullYear();
  let months = now.getMonth() - birthDate.getMonth();
  let days = now.getDate() - birthDate.getDate();

  if (days < 0) {
    months--;
    days += new Date(now.getFullYear(), now.getMonth(), 0).getDate();
  }
  if (months < 0) {
    years--;
    months += 12;
  }

  document.querySelector(".years").innerHTML = `${years} <span>Years</span>`;
  document.querySelector(".months").innerHTML = `${months} <span>Months</span>`;
  document.querySelector(".days").innerHTML = `${days} <span>Days</span>`;
}
