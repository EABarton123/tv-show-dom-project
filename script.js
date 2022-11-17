const rootElem = document.getElementById("root");
const selectEpisodeElement = document.getElementById("selectAnEpisode");
const selectShowElement = document.getElementById("selectAShow");
const searchElement = document.getElementById("search");
const selectedEpisodesElement = document.getElementById("selectedEpisodes");
const selectedShowsElement = document.getElementById("selectedShows");
let currentEpisodes = [];
let searchFilter = "";

let allEpisodes = getAllEpisodes();
//let showID = getShowID();

let allShows = getAllShows();
//getAllShowsFromAPI;

/*function getAllEpisodesFromAPI() {
  fetch("https://api.tvmaze.com/shows/82/episodes")
    // Get the response and extract the JSON
    .then(function (response) {
      return response.json();
    })
    // Do something with the JSON
    .then((episodeList) => {
      allEpisodes = episodeList;
      loadEpisodeList(episodeList);

      return episodeList;
    })
    .catch((error) => console.log(error));
}*/

/*function getAllShowsFromAPI() {
  fetch(`https://api.tvmaze.com/shows/${showID}/episodes`)
    .then(function (response) {
      return response.json();
    })
    // Do something with the JSON
    .then((showList) => {
      allShows = showList;
      getAllEpisodesFromAPI(showList);
    })
    .catch((error) => console.log(error));
}*/

loadShowList(allShows);

/*function getShowID() {
  shows.forEach((show) => {
    return show.id;
  });
}*/
//const selectShow

//const allEpisodes = getAllEpisodes();

selectShowElement.addEventListener("change", (event) => {
  const showID = event.target.value;
  if (showID === "All") {
    return getAllShows;
  }
  clearEpisodeDropDown();
  fetch(`https://api.tvmaze.com/shows/${showID}/episodes`)
    .then(function (response) {
      return response.json();
    })
    // Do something with the JSON
    .then((episodes) => {
      currentEpisodes = episodes;
      loadEpisodeList();
    })
    .catch((error) => console.log(error));
});

function loadShowList(shows) {
  const episodeOptionElement = document.createElement("option");
  episodeOptionElement.value = allShows;
  episodeOptionElement.innerText = "All";
  shows.forEach((show) => {
    shows.sort();
    rootElem.appendChild(createShowList(show));
    //if (shows.length === allShows.length) {
    const showOptionElement = document.createElement("option");
    showOptionElement.innerText = show.name;
    showOptionElement.setAttribute("value", show.id);
    selectShowElement.appendChild(showOptionElement);
  });
}

function getFilteredEpisodes() {
  const result = currentEpisodes.filter((episode) => {
    if (!selectEpisodeElement.value) {
      return (
        episode.name.toLowerCase().includes(searchFilter) ||
        episode.summary.toLowerCase().includes(searchFilter)
      );
    }
    return episode.id === Number(selectEpisodeElement.value);
  });
  return result;
}

function loadEpisodeList() {
  clearRootElement();
  getFilteredEpisodes().forEach((episode) => {
    rootElem.appendChild(createEpisodeList(episode));
  });
  const episodes = currentEpisodes;
  const episodeOptionElement = document.createElement("option");
  episodeOptionElement.value = "";
  episodeOptionElement.innerText = "All";
  selectEpisodeElement.appendChild(episodeOptionElement);
  episodes.forEach((episode) => {
    const episodeOptionElement = document.createElement("option");
    episodeOptionElement.value = episode.id;
    episodeOptionElement.innerText = `${paddedEpisodeTime(episode)} - ${
      episode.name
    }`;
    selectEpisodeElement.appendChild(episodeOptionElement);
  });
}

function paddedEpisodeTime(episode) {
  const paddedSeason = String(episode.season).padStart(2, "0");
  const paddedNumber = String(episode.number).padStart(2, "0");
  return `S${paddedSeason}E${paddedNumber}`; //episodeTime is ready
}

//getAllEpisodesFromAPI().then((everyEpisode) => loadEpisodeList(everyEpisode));
function createShowList(show) {
  const eachShowCard = document.createElement("li");

  const showNameHeader = document.createElement("h2");
  showNameHeader.innerText = show.name; //name is ready

  const showSummary = document.createElement("p");
  showSummary.innerHTML = show.summary;

  eachShowCard.appendChild(showNameHeader);
  eachShowCard.appendChild(showSummary);

  if (show.image && show.image.medium) {
    const imgTagShow = document.createElement("img");
    imgTagShow.src = show.image.medium;
    eachShowCard.appendChild(imgTagShow);
  }

  const linkToMazeShow = document.createElement("a");
  linkToMazeShow.href = show.url;
  linkToMazeShow.innerHTML = "Information from TVMaze.com click here to see"; //great it should work
  eachShowCard.appendChild(linkToMazeShow);
  return eachShowCard;
}

function createEpisodeList(episode) {
  const eachEpisodeCard = document.createElement("li");

  const episodeNameHeader = document.createElement("h2");
  episodeNameHeader.innerText = episode.name; //name is ready

  const episodeSummary = document.createElement("p");
  episodeSummary.innerHTML = episode.summary; //summary is ready

  const episodeTime = document.createElement("p");
  const paddedSeason = String(episode.season).padStart(2, "0");
  const paddedNumber = String(episode.number).padStart(2, "0");
  episodeTime.innerText = `S${paddedSeason}E${paddedNumber}`; //episodeTime is ready

  // Now, we will append them one by one
  eachEpisodeCard.appendChild(episodeNameHeader);
  eachEpisodeCard.appendChild(episodeSummary);
  eachEpisodeCard.appendChild(episodeTime);

  if (episode.image && episode.image.medium) {
    const imgTag = document.createElement("img");
    imgTag.src = episode.image.medium;
    eachEpisodeCard.appendChild(imgTag);
  }

  const linkToMaze = document.createElement("a");
  linkToMaze.href = episode.url;
  linkToMaze.innerHTML = "Information from TVMaze.com click here to see"; //great it should work
  eachEpisodeCard.appendChild(linkToMaze);
  return eachEpisodeCard;
}

function clearRootElement() {
  rootElem.replaceChildren();
}

function clearEpisodeDropDown() {
  selectEpisodeElement.replaceChildren();
}

searchElement.addEventListener("input", function () {
  searchFilter = searchElement.value;
  loadEpisodeList();
});

selectEpisodeElement.addEventListener("change", () => {
  loadEpisodeList();
});
