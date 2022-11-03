//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

let searchTerm = "";

function createSearchBox() {
  const searchBox = document.createElement("input");
  searchBox.addEventListener("input", (event) => {
    searchTerm = event.target.value.toLowerCase;
  });
  return searchBox;
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  rootElem.textContent = `Got ${episodeList.length} episode(s)`;
  rootElem.appendChild(createSearchBox());

  const newDiv = document.createElement("div");
  rootElem.appendChild(newDiv);
  const episode = episodeList.forEach(createEpisodeList);

  function createEpisodeList(episode) {
    const newList = document.createElement("ul");
    newDiv.appendChild(newList);
    const attributeArray = ["name", "summary"];
    const seasonAndNumberElement = document.createElement("li");
    const paddedSeason = String(episode.season).padStart(2, "0");
    const paddedNumber = String(episode.number).padStart(2, "0");
    seasonAndNumberElement.innerText = `S${paddedSeason}${paddedNumber}`;
    newList.appendChild(seasonAndNumberElement);

    attributeArray.forEach((attribute) => {
      const newListElement = document.createElement("li");
      newListElement.innerHTML = episode[attribute];
      newList.appendChild(newListElement);
    });

    const imgTag = document.createElement("img");
    imgTag.src = episode.image.medium;
    const imageListElement = document.createElement("li");
    imageListElement.appendChild(imgTag);
    newList.appendChild(imageListElement);

    const linkToMaze = document.createElement("a");
    linkToMaze.href = episode._links.self.href;
    const linkListElement = document.createElement("li");
    linkToMaze.innerText = "Information from TVMaze.com click here to see";
    linkListElement.appendChild(linkToMaze);
    newList.appendChild(linkListElement);
  }
}

window.onload = setup;
