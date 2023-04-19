// script file for main page of website.
const hambergerMenu = document.getElementsByClassName("menu")[0];
const hambergerIcon = document.getElementsByClassName("dropdown")[0];

hambergerIcon.addEventListener("click", () => {
    hambergerMenu.classList.toggle("d-flex");
    hambergerMenu.classList.toggle("d-none");
})

const searchBar = document.querySelector("#search-bar");
const searchResults = document.getElementById("results");


async function getMoviesList(key) {
    let url = `https://www.omdbapi.com/?s=${key}&?type=sereis&apikey=e10a7d33`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        // console.table(data?.Search);
        if (data.Search) {
            renderSearchResults(data.Search)
        } else {
            searchResults.innerHTML = "No Movies Found for this name";
        }
    } catch (err) {
        console.log(err);
    }
}

searchBar.addEventListener("keydown", (event) => {
    if (event.key == "Enter") {
        event.preventDefault();
    }
});

searchBar.addEventListener("keyup", function (e) {
    console.log(e.target.value);
    if (e.target.value != "") {
        getMoviesList(e.target.value)
    }
})


function renderSearchResults(array) {
    searchResults.innerHTML = "";
    array.map((data) => {
        searchResults.innerHTML = searchResults.innerHTML + `<a href="">
        <div class="movie-card">
            <div class="movie-card-header">
                <img src=${data.Poster} 
                alt="Movie poster"
                data-id = "${data.Title} "
                class="movie-card-poster">
            </div>
            <div class="movie-card-body">
                <p class="movie-release-date">
                    <i class="fa-solid fa-calendar-days"></i>
                    27-10-23
                </p>
                <h4 
                class="movie-card-title"
                data-id = "${data.Title} ">
                ${data.Title}</h4>

            </div>
            </a>
            <div class="movie-card-footer">
                <p class="card-text">
                    <i class="fa-solid fa-star">
                        <span id="rating">&nbsp;${data.imdbRating}</span>
                    </i>
                    <button class="fav-btn">
                        <i class="fa-solid fa-heart"></i>
                    </button>
                </p>
            </div>
        </div>
  `
    })
}