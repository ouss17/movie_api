const APIKEY = "1ceff4e1c9a66489965a4ebf0270f20c";
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxY2VmZjRlMWM5YTY2NDg5OTY1YTRlYmYwMjcwZjIwYyIsIm5iZiI6MTcyOTY3MTQzNy4yMzY0NjQsInN1YiI6IjVkZGQ0NzIwZThkMGI0MDAxMWY5ZDcxNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TCs8tVp3adgjNEPRnFjxgmAdDe0c4KOH43KeS0FHL5w",
  },
};

const fetchApp = (url, options = {}) => {
  return fetch(url, options).then((res) => res.json());
};

const queryString = window.location.search;
// console.log(queryString);
const urlParams = new URLSearchParams(queryString);
const movie = urlParams.get("id");
// console.log(movie);

const getMovieDetail = (id) => {
  fetchApp(
    `https://api.themoviedb.org/3/movie/${id}?language=fr-FR`,
    options
  ).then((data) => {
    // console.log(data);
    const html = `<aside class="detail-movie">
            <img class="logo" src="https://media.themoviedb.org/t/p/w220_and_h330_face${data.poster_path}" alt="${data.title} poster" />
            <div class="genres"></div>
            <div class="studios"></div>
        </aside>
        <div class="detail-container">
            <a class="link-back" href="./index.html">< Retour</a>
            <h1 class="title-movie">${data.title}</h1>
            <h2 class="title-movie-original">${data.original_title}</h2>
            <p class="description">${data.overview}</p>
            <p class="budget">Budget : ${data.budget}$</p>
            <div class="languages">
                <span>Disponible en :</span>
                <div class="available-languages"></div>
            </div>
            <div class="notation">
                <span class="count">${data.vote_count} votants</span>
                <span class="count">Note moyenne : <span class="score">${data.vote_average}</span></span>
            </div>
            <div class="similar-section">
            <h3 class="title-third">Films similaires</h3>
            <section class="similar"></section>
            </div>
        </div>`;
    document.querySelector(".container").insertAdjacentHTML("afterbegin", html);
    switch (true) {
      case parseFloat(data["vote_average"]) > 7:
        document.querySelector(".score").style.color = "green";
        document.querySelector(".score").style.borderColor = "green";
        // console.log(data.title, ">");
        break;
      case parseFloat(data["vote_average"]) < 5:
        document.querySelector(".score").style.color = "red";
        document.querySelector(".score").style.borderColor = "red";
        // console.log(data.title, "<");
        break;
      default:
        document.querySelector(".score").style.color = "black";
        document.querySelector(".score").style.borderColor = "black";
      // console.log(data.title, "=");
    }

    const genres = document.querySelector(".genres");
    const studios = document.querySelector(".studios");
    const languages = document.querySelector(".available-languages");
    data.genres &&
      data.genres.forEach((element) => {
        genres.insertAdjacentHTML(
          "afterbegin",
          `<p class="genre">${element.name}</p>`
        );
      });

    data.production_companies &&
      data.production_companies.forEach((element) => {
        studios.insertAdjacentHTML(
          "afterbegin",
          element.logo_path !== null
            ? `<img class="logo-studio" src="https://media.themoviedb.org/t/p/w220_and_h330_face${element.logo_path}" alt="${element.name} logo" /> `
            : `<p class="studio">${element.name}</p>`
        );
      });

    data.spoken_languages.length > 0
      ? data.spoken_languages.forEach((element) => {
          languages.insertAdjacentHTML(
            "afterbegin",
            `<p class="language">${element.name}</p>`
          );
        })
      : languages.insertAdjacentHTML(
          "afterbegin",
          `<p class="language">Aucune langue pour vous :p</p>`
        );

    getSimilar(movie);
  });
};

const getSimilar = (id) => {
  fetchApp(
    `https://api.themoviedb.org/3/movie/${id}/similar?language=fr-FR&page=1`,
    options
  ).then((res) => {
    const section = document.querySelector(".similar");
    // console.log(res);
    // console.log(res.results, "res");
    if (res.results.length > 0) {
      res.results.forEach((element, i) => {
        if (i < 13) {
          let text = `
              <div class="card-container">
              <a href="./detail.html?id=${element.id}">
              <img src="https://media.themoviedb.org/t/p/w220_and_h330_face${
                element["poster_path"]
              }" alt=${element["original_title"]} />
              <div class="footer-card">
              <p class="title-movie">${
                element.title.length > 16
                  ? element.title.slice(0, 16) + "..."
                  : element.title
              }</p>
              <span class="score" id="movie${element.id}">${element[
            "vote_average"
          ].toFixed(1)}</span>
              </div>
              </a>
              </div>
              `;

          section.insertAdjacentHTML("beforeend", text);
          switch (true) {
            case parseFloat(element["vote_average"]) > 7:
              document.querySelector(`#movie${element.id}`).style.color =
                "green";
              document.querySelector(`#movie${element.id}`).style.borderColor =
                "green";
              // console.log(element.title, ">");
              break;
            case parseFloat(element["vote_average"]) < 5:
              document.querySelector(`#movie${element.id}`).style.color = "red";
              document.querySelector(`#movie${element.id}`).style.borderColor =
                "red";
              // console.log(element.title, "<");
              break;
            default:
              document.querySelector(`#movie${element.id}`).style.color =
                "black";
              document.querySelector(`#movie${element.id}`).style.borderColor =
                "black";
            // console.log(element.title, "=");
          }
        }
      });
    } else {
      section.insertAdjacentHTML("beforeend", "Aucun film similaire :p");
    }
  });
};

getMovieDetail(movie);
