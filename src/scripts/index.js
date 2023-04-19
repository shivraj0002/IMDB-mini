// script file for main page of website.
const hambergerMenu = document.getElementsByClassName("menu")[0];
const hambergerIcon = document.getElementsByClassName("dropdown")[0];

hambergerIcon.addEventListener("click", () => {
    hambergerMenu.classList.toggle("d-flex");
    hambergerMenu.classList.toggle("d-none");
})

const searchBar = document.querySelector("#search-bar");
const searchResults = document.getElementById("results");
const fevorites = document.getElementById("fevoriteMovies");

async function getMoviesList(key) {
    let url = `https://www.omdbapi.com/?s=${key}&?type=sereis&apikey=e10a7d33`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        console.table(data?.Search);
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
        searchResults.innerHTML = searchResults.innerHTML + `
        <div class="movie-card">
            <div class="movie-card-header">
                <img src=${data.Poster} 
                alt="Movie poster"
                data-id = "${data.Title}"
                class="movie-card-poster">
            </div>
            <div class="movie-card-body">
                <p class="movie-release-date">
                    <i class="fa-solid fa-calendar-days"></i>
                    ${data.Year}
                </p>
                <h4 
                class="movie-card-title"
                data-id="${data.Title}">
                ${data.Title}</h4>

            </div>
            <div class="movie-card-footer">
                <p class="card-text">
                <button class="readMore-btn" id="read-more" data-id="${data.imdbID} ">
                    Read More
                 </button>
                    <button class="fav-btn" id="add-fev"  data-id="${data.imdbID} ">
                        <i class="fa-solid fa-heart" id="add-fevo"  data-id="${data.imdbID}"></i>
                    </button>
                </p>
            </div>
        </div>
  `
    })
}

function renderFevoriteList() {
    const storedFeviriteList = localStorage.getItem('favorites');
    if (storedFeviriteList !== null) {
        const currentFevoriteList = JSON.parse(storedFeviriteList);
        fevorites.innerHTML = "";
        currentFevoriteList.map((data) => {
            fevorites.innerHTML = fevorites.innerHTML + `
            <div class="fev-movie-card-container ">
                <div class="fev-movie-poster"><img
                        src="${data.Poster}"
                        alt="Poster Image"></div>
                <div class="fev-movie-title">
                    <h4 class="fev-movie-card-title">${data.Title}</h4>
                    <p class="fev-movie-release-date">
                        <i class="fa-solid fa-calendar-days"></i>
                        ${data.Year}
                    </p>
                    <button class="readMore-btn" id="read-more" data-id="${data.imdbID} ">
                    Read More
                 </button>
                </div>

                <div class="fev-movie-delete-icon" >
                    <i class="fa-solid fa-trash-can" id="del-fev" data-id="${data.imdbID}"></i>
                </div>
            </div> `

        })

    }
}

function favoriteMovieAdd(movie) {
    const storedFeviriteList = localStorage.getItem('favorites');
    if (storedFeviriteList !== null) {
        const currentFevoriteList = JSON.parse(storedFeviriteList);
        currentFevoriteList.unshift(movie);
        localStorage.setItem('favorites', JSON.stringify(currentFevoriteList));
    } else {
        let newFavoriteMovieList = []
        newFavoriteMovieList.push(movie);
        localStorage.setItem('favorites', JSON.stringify(newFavoriteMovieList));
    }
    renderFevoriteList()
}
function favoriteMovieDelete(id) {
    const storedFeviriteList = localStorage.getItem('favorites');
    if (storedFeviriteList !== null) {
        const currentFevoriteList = JSON.parse(storedFeviriteList);
        let newFavoriteList = currentFevoriteList.filter(movie => movie.imdbID != id)
        localStorage.setItem('favorites', JSON.stringify(newFavoriteList));
    }
    renderFevoriteList()
}

async function favoriteMovieGet(searchValue) {
    const url = `https://www.omdbapi.com/?i=${searchValue}&?type=sereis&apikey=e10a7d33`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Something went wrong");
        }
        const data = await response.json();
        // console.log(data);
        favoriteMovieAdd(data)
    } catch (error) {
        console.error(error.message);
    }
};

(
    function () {
        renderFevoriteList();
    }
)();

document.addEventListener("click", function (e) {
    // console.log(e.target);
    if (e.target.id == "add-fev" || e.target.id == "add-fevo") {
        let id = e.target.dataset.id;
        console.log(id);
        favoriteMovieGet(id)
    } else if (e.target.id == "del-fev") {
        let id = e.target.dataset.id;
        console.log(id);
        favoriteMovieDelete(id)
    } else if (e.target.id == "read-more") {
        let id = e.target.dataset.id;
        console.log(id);
        localStorage.setItem("movieName", id);

        window.location.href = 'movie-details.html';

    }
});