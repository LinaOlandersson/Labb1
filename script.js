const easteregg = document.getElementById("easteregg");
var body = document.body;

easteregg.addEventListener("click", function () {
  let r = Math.floor(Math.random() * 256);
  let g = Math.floor(Math.random() * 256);
  let b = Math.floor(Math.random() * 256);
  body.style.backgroundColor = `rgb(${r} ${g} ${b})`;
});

let eggInput = "";
let eastereggModal = document.getElementById("easteregg-modal");
let closeModal = document.getElementById("easteregg-close-modal");

document.addEventListener("keydown", function (event) {
  eggInput += event.key;
  if (eggInput.includes("1980")) {
    eastereggModal.style.display = "block";
    eggInput = "";
  }
});

closeModal.addEventListener("click", function () {
  eastereggModal.style.display = "none";
});
