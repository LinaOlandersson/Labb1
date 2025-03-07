document.addEventListener("DOMContentLoaded", getCV);
document.addEventListener("DOMContentLoaded", getRepos);

async function getCV() {
  try {
    const response = await fetch("cv.json");
    if (!response.ok) {
      throw new Error("Kunde inte hämta data.");
    }
    const data = await response.json();
    showWorkExperiences(data.workExperiences);
    showEducations(data.educations);
    showArray(data.programmingLanguages, "programming-languages-list", "p");
    showArray(data.others, "others-list", "p");
  } catch (error) {
    console.log("Ett fel inträffade vid hämtning av data: " + error.message);
  }
}

function showWorkExperiences(workExperiences) {
  const workListElement = document.getElementById("work-experience-list");
  workExperiences.forEach((we) => {
    const workElement = document.createElement("section");
    workElement.innerHTML = `
    <h4>${we.years}</h4>
    <p>${we.title},</p>
    <p>${we.company}, ${we.location}</p>
    `;
    workListElement.appendChild(workElement);
  });
}

function showEducations(educations) {
  const educationListElement = document.getElementById("education-list");
  educations.forEach((e) => {
    const educationElement = document.createElement("section");
    const subjectHTML = e.subject
      .map((s) => `<p>${s.subjectName}, ${s.points}, ${s.location}</p>`)
      .join("");
    educationElement.innerHTML = `
    <h4>${e.years}</h4>
    <p>${subjectHTML}</p>
    `;
    educationListElement.appendChild(educationElement);
  });
}

function showArray(property, elementId, createdElement) {
  const listElement = document.getElementById(elementId);
  property.forEach((item) => {
    const element = document.createElement(createdElement);
    element.innerHTML = `${item}`;
    listElement.appendChild(element);
  });
}

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

const BASE_URL = "https://api.github.com/users/LinaOlandersson/repos";
const repoList = document.getElementById("repos");

async function getRepos() {
  try {
    const response = await fetch(BASE_URL);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    displayRepos(data);
  } catch (error) {
    console.log(error);
    console.error("Error fetching data: ", error);
  }
}

function displayRepos(data) {
  data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  data.forEach((repo) => {
    if (repo.visibility === "public") {
      const repoElement = document.createElement("div");
      repoElement.className = "repo-card";
      repoElement.innerHTML = `
      <a href="${repo.html_ref}"><h4>${repo.name}</h4></a>
      <p>${repo.description}</p>
      `;
      repoList.appendChild(repoElement);
    }
  });
}
