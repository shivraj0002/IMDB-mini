// script for single movie details page
(function () {
    const poster = document.querySelector('#Poster');
    const title = document.querySelector('#Title');
    const year = document.querySelector('#Year');
    const released = document.querySelector('#Released');
    const runtime = document.querySelector('#Runtime');
    const genre = document.querySelector('#Genre');
    const director = document.querySelector('#Director');
    const actors = document.querySelector('#Actors');
    const language = document.querySelector('#Language');
    const country = document.querySelector('#Country');
    const imdbRating = document.querySelector('#imdbRating');
    const type = document.querySelector('#Type');

    const id = localStorage.getItem("movieName");

    GetMovie(id);

    async function GetMovie(searchValue) {
        const url = `https://www.omdbapi.com/?i=${searchValue}&?type=sereis&apikey=e10a7d33`;
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error("Something went wrong");
            }
            const data = await response.json();
            console.table(data);
            if (data) {
                poster.src = data.Poster;
                title.innerHTML = data.Title;
                year.innerHTML = data.Year;
                released.innerHTML = data.Released
                runtime.innerHTML = data.Runtime
                genre.innerHTML = data.Genre.substring(0, 25) + "..";
                director.innerHTML = data.Director
                actors.innerHTML = data.Actors.substring(0, 25) + "..";
                language.innerHTML = data.Language;
                country.innerHTML = data.Country
                imdbRating.innerHTML = data.imdbRating;
                type.innerHTML = data.Type
            }
        } catch (error) {
            console.error(error.message);
        }
    };
})();