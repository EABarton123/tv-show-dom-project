//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  createSearchBox();
  makePageForEpisodes(allEpisodes);
}
let searchTerm = "";
function createSearchBox() {
  const searchBox = document.createElement("input");
  const headerElement = document.getElementById("header");
  headerElement.appendChild(searchBox);
  searchBox.addEventListener("input", (event) => {
    searchTerm = event.target.value.toLowerCase();
    console.log({ searchTerm });
    //just for check
    const filteredEpisodes = filterSearchBox();
    console.log({ filteredEpisodes });
    makePageForEpisodes(filteredEpisodes);
  });
  // return searchBox;
}

function filterSearchBox() {
  const episode = getAllEpisodes();
  const filteredEpisodes = [];
  for (let i = 0; i < episode.length; i++) {
    console.log(episode[i]);
    if (
      episode[i].name //we have to look at the name OR summary so
        .toLowerCase()
        // ...and the text matches the search query...
        .includes(searchTerm.toLowerCase())
    ) {
      // ...remove the `.is-hidden` class.
      // episode[i].classList.remove("is-hidden");//I will explain later how can u use this way
      return filteredEpisodes.push(episode[i]);
    } else {
      // Otherwise, add the class.
      // episode[i].classList.add("is-hidden");
    }
  }
  return filteredEpisodes; // we have our filtered episodes includes search word
}

function makePageForEpisodes(episodeList) {
  //const searchBox = createSearchBox();
  const filteredEpisodes = filterSearchBox(); //this will return filtered episodes so I will save in a variable
  const rootElem = document.getElementById("root");
  // if there is another element on the DOM we will delete them first
  rootElem.innerHTML = "";
  rootElem.textContent = `Got ${filteredEpisodes.length} episode(s)`;

  // const newDiv = document.createElement("div");
  // rootElem.appendChild(newDiv);
  const newList = document.createElement("ul"); //we will use one ul and 73 li
  // rootElem.appendChild(newList);
  const episode = episodeList.forEach(createEpisodeList);

  function createEpisodeList(episode) {
    // example HTML
    // < ul> //const newList
    //        <li> //const eachEpisodeCard
    //              <h2>episode.name</h2>//episodeNameHeader
    //              <p>episode.summary</p>//episodeSummary
    //              <p>epsiodeTime</p>//episodeTime
    //      </li>
    // so on
    // we can carry on later, you can return the sessin Emily
    const attributeArray = ["name", "summary"]; //????
    const eachEpisodeCard = document.createElement("li");

    const episodeNameHeader = document.createElement("h2");
    episodeNameHeader.innerText = episode.name; //name is ready

    const episodeSummary = document.createElement("p");
    episodeSummary.innerHTML = episode.summary; //summary is ready

    const episodeTime = document.createElement("p");
    const paddedSeason = String(episode.season).padStart(2, "0");
    const paddedNumber = String(episode.number).padStart(2, "0");
    // seasonAndNumberElement.innerText = `S${paddedSeason}${paddedNumber}`;
    episodeTime.innerText = `S${paddedSeason}${paddedNumber}`; //episodeTime is ready

    // Now, we will append them one by one
    eachEpisodeCard.appendChild(episodeNameHeader);
    eachEpisodeCard.appendChild(episodeSummary);
    eachEpisodeCard.appendChild(episodeTime);
    //rootElement.appendChild(newList);

    newList.appendChild(eachEpisodeCard); // I put my card into the ul

    // attributeArray.forEach((attribute) => {
    //   const newListElement = document.createElement("li");
    //   newListElement.innerHTML = episode[attribute];
    //   newList.appendChild(newListElement);
    // });

    const imgTag = document.createElement("img");
    imgTag.src = episode.image.medium;
    newList.appendChild(imgTag);
    // const imageListElement = document.createElement("li");
    // imageListElement.appendChild(imgTag);
    // newList.appendChild(imageListElement);

    const linkToMaze = document.createElement("a");
    linkToMaze.href = episode.url;
    // const linkListElement = document.createElement("li");
    linkToMaze.innerHTML = "Information from TVMaze.com click here to see"; //great it should work
    eachEpisodeCard.appendChild(linkToMaze);
    // newList.appendChild(linkListElement);
  }
  rootElement.appendChild(newList);
}
//can you check the browser please
//can u see anything?

//yes
//cool we can do a quick session later and talk about it
//still no search bar though? although putting it in the way you have makes more sense
//we will find a way---oor make new one :)
//great thank you
window.onload = setup;
