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

const getMovies = () => {
  return fetchApp(
    "https://api.themoviedb.org/3/movie/top_rated?language=fr-FR&page=1",
    options
  );
};

const section = document.querySelector(".section");
const sectionRated = document.querySelector(".section-rated");

const renderNews = (func, section) => {
  func().then((res) => {
    // console.log(res);
    res.results.forEach((element, i) => {
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
          document.querySelector(`#movie${element.id}`).style.color = "green";
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
          document.querySelector(`#movie${element.id}`).style.color = "black";
          document.querySelector(`#movie${element.id}`).style.borderColor =
            "black";
        // console.log(element.title, "=");
      }
    });
  });
};

renderNews(getMovies, sectionRated);
