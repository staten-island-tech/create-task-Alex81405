import "/styles/style.css";
import { DOMSelectors } from "./dom";

const URL = "https://v2.jokeapi.dev/joke/Any?safe-mode";

async function getRandomJoke(url) {
  try {
    const response = await fetch(url);
    if (response.status < 200 || response.status > 299) {
      console.log(response.status);
      throw new Error(response);
    } else {
      const data = await response.json();
      console.log(data);
      if (data.setup) {
        DOMSelectors.randomjoke.innerHTML = `${data.setup} <br><br> ${data.delivery}`;
      } else if (data.error === true) {
        DOMSelectors.randomjoke.innerHTML = data.causedBy;
      } else {
        DOMSelectors.randomjoke.innerHTML = data.randomjoke;
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
  getRandomJoke(newURL);
  DOMSelectors.searchInput.value = "";
});

document.addEventListener("DOMContentLoaded", function () {
  getRandomJoke(URL);
});

DOMSelectors.jokeButton.addEventListener("click", function () {
  getRandomJoke(URL);
});
