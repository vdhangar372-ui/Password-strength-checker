const passwordInput = document.getElementById("password");
const bar = document.getElementById("bar");
const scoreText = document.getElementById("score");
const feedback = document.getElementById("feedback");

const generateBtn = document.getElementById("generate");
const copyBtn = document.getElementById("copy");
const toggleBtn = document.getElementById("toggle");

/* ========= BLACKLIST ========= */
const commonPasswords = ["123456", "password", "qwerty", "admin", "abc123"];


/* ========= CHECK PASSWORD ========= */
passwordInput.addEventListener("input", checkStrength);

function checkStrength() {
  const pass = passwordInput.value;
  let score = 0;
  let messages = [];

  if (commonPasswords.includes(pass)) {
    score = 0;
    messages.push("Very common password ❌");
    updateUI(score, messages);
    return;
  }

  if (pass.length >= 8) score += 20;
  else messages.push("Use at least 8 characters");

  if (pass.length >= 12) score += 10;

  if (/[A-Z]/.test(pass)) score += 20;
  else messages.push("Add uppercase letter");

  if (/[a-z]/.test(pass)) score += 20;
  else messages.push("Add lowercase letter");

  if (/[0-9]/.test(pass)) score += 15;
  else messages.push("Add numbers");

  if (/[^A-Za-z0-9]/.test(pass)) score += 15;
  else messages.push("Add special character");

  updateUI(score, messages);
}


/* ========= UPDATE UI ========= */
function updateUI(score, messages) {
  bar.style.width = score + "%";
  scoreText.innerText = `Score: ${score}/100`;

  if (score < 40) bar.style.background = "red";
  else if (score < 70) bar.style.background = "orange";
  else bar.style.background = "green";

  feedback.innerHTML = "";
  messages.forEach(msg => {
    const li = document.createElement("li");
    li.textContent = msg;
    feedback.appendChild(li);
  });
}


/* ========= GENERATE PASSWORD ========= */
generateBtn.addEventListener("click", () => {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";

  let pass = "";
  for (let i = 0; i < 14; i++) {
    pass += chars[Math.floor(Math.random() * chars.length)];
  }

  passwordInput.value = pass;
  checkStrength();
});


/* ========= COPY BUTTON ========= */
copyBtn.addEventListener("click", () => {
  navigator.clipboard.writeText(passwordInput.value);
  alert("Copied!");
});


/* ========= TOGGLE VISIBILITY ========= */
toggleBtn.addEventListener("click", () => {
  passwordInput.type =
    passwordInput.type === "password" ? "text" : "password";
});
