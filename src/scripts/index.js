// script file for main page of website.
const hambergerMenu = document.getElementsByClassName("menu")[0];
const hambergerIcon = document.getElementsByClassName("dropdown")[0];

hambergerIcon.addEventListener("click", () => {
    hambergerMenu.classList.toggle("d-flex");
    hambergerMenu.classList.toggle("d-none");
})

const searchBar = document.querySelector("#search-bar");


async function getMoviesList(key) {
    let url = `https://www.omdbapi.com/?s=${key}&?type=sereis&apikey=e10a7d33`;

    let req = await fetch(url);
    let data = await req.json();
    console.log(data.Response);
}

searchBar.addEventListener("keyup", function (e) {
    console.log(e.target.value);
    getMoviesList(e.target.value)
})