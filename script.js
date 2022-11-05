const rootElem = document.getElementById("root");
const selectElement = document.getElementById("select");
const searchElement = document.getElementById("search");
const selectedEpisodesElement = document.getElementById("selectedEpisodes");
const allEpisodes = getAllEpisodes();

function loadEpisodeList(episodes) {
  episodes.forEach((episode) => {
    rootElem.appendChild(createEpisodeList(episode));
    if (episodes.length === allEpisodes.length) {
      const optionElement = document.createElement("option");
      optionElement.innerText = `${paddedEpisodeTime(episode)} - ${
        episode.name
      }`;
      selectElement.appendChild(optionElement);
    }
  });
}

function paddedEpisodeTime(episode) {
  const paddedSeason = String(episode.season).padStart(2, "0");
  const paddedNumber = String(episode.number).padStart(2, "0");
  return `S${paddedSeason}E${paddedNumber}`; //episodeTime is ready
}

loadEpisodeList(allEpisodes);

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

  const imgTag = document.createElement("img");
  imgTag.src = episode.image.medium;
  eachEpisodeCard.appendChild(imgTag);

  const linkToMaze = document.createElement("a");
  linkToMaze.href = episode.url;
  linkToMaze.innerHTML = "Information from TVMaze.com click here to see"; //great it should work
  eachEpisodeCard.appendChild(linkToMaze);
  return eachEpisodeCard;
}

searchElement.addEventListener("input", function () {
  const searchInput = searchElement.value.toLowerCase();
  const filterResults = allEpisodes.filter((episode) => {
    return (
      episode.name.toLowerCase().includes(searchInput) ||
      episode.summary.toLowerCase().includes(searchInput)
    );
  });
  rootElem.innerHTML = "";
  loadEpisodeList(filterResults);
});

selectElement.addEventListener("change", () => {
  const value = selectElement.value.substring(9);
  let remainedEpisodes = allEpisodes.filter(
    (episode) => episode.name === value
  );
  if (!value) {
    remainedEpisodes = allEpisodes;
  }
  search.value = "";
  rootElem.innerHTML = "";
  loadEpisodeList(remainedEpisodes);
});
