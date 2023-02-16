import "/styles/style.css";
import { DOMSelectors } from "./dom";

const URL = "https://v2.jokeapi.dev/joke/Any?safe-mode";

async function getRandomFact(url) {
  try {
    const response = await fetch(url);
    if (response.status < 200 || response.status > 299) {
      console.log(response.status);
      throw new Error(response);
    } else {
      const data = await response.json();
      console.log(data);
      if (data.setup) {
        DOMSelectors.randomfact.innerHTML = `${data.setup} <br><br> ${data.delivery}`;
      } else if (data.error === true) {
        DOMSelectors.randomfact.innerHTML = data.causedBy;
      } else {
        DOMSelectors.randomfact.innerHTML = data.randomfact;
      }
    }
  } catch (error) {
    console.log(error);
  }
}

DOMSelectors.searchButton.addEventListener("click", function () {
  let newURL = URL + "&contains=" + DOMSelectors.searchInput.value;
  console.log(searchInput.value);
  console.log(newURL);
  getRandomFact(newURL);
  DOMSelectors.searchInput.value = "";
});

document.addEventListener("DOMContentLoaded", function () {
  getRandomFact(URL);
});

DOMSelectors.factButton.addEventListener("click", function () {
  getRandomFact(URL);
});
