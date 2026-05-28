const body = document.body;

const toggleBtn = document.getElementById("toggleBtn");

const modeText = document.getElementById("modeText");


// Local Storage se theme lo
let savedTheme = localStorage.getItem("theme");


// Agar localStorage me kuch nahi hai
// to OS ka mode check karo
if (!savedTheme) {

  const osDarkMode = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;

  if (osDarkMode) {
    savedTheme = "dark";
  } 
  else {
    savedTheme = "light";
  }
}


// Theme Apply Function
function setTheme(theme){

  body.classList.remove("light", "dark");

  body.classList.add(theme);

  // Local Storage me save karo
  localStorage.setItem("theme", theme);

  modeText.innerText =
    `Current Mode : ${theme}`;
}


// Starting me theme apply karo
setTheme(savedTheme);


// Button Click
toggleBtn.addEventListener("click", () => {

  if (body.classList.contains("dark")) {
    setTheme("light");
  } 
  else {
    setTheme("dark");
  }

});