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
    "https://api.themoviedb.org/3/movie/upcoming?language=fr-FR&page=1",
    options
  );
  // .then((res) => console.log(res))
  // .catch((err) => console.error(err));
};

const getRatedMovies = () => {
  return fetchApp(
    "https://api.themoviedb.org/3/movie/top_rated?language=fr-FR&page=1",
    options
  );
};

const section = document.querySelector(".section");
const sectionNews = document.querySelector(".section-news");
const sectionRated = document.querySelector(".section-rated");
const renderNews = (func, section) => {
  func().then((res) => {
    // console.log(res);
    res.results.forEach((element, i) => {
      if (i < 5) {
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
      }
    });
  });
};
const GetAllMovies = async () => {
  try {
    let prom = await Promise.all([
      fetchApp(
        `https://api.themoviedb.org/3/movie/popular?language=fr-FR&page=1`,
        options
      ),
      fetchApp(
        `https://api.themoviedb.org/3/movie/popular?language=fr-FR&page=2`,
        options
      ),
      fetchApp(
        `https://api.themoviedb.org/3/movie/popular?language=fr-FR&page=3`,
        options
      ),
      fetchApp(
        `https://api.themoviedb.org/3/movie/popular?language=fr-FR&page=4`,
        options
      ),
      fetchApp(
        `https://api.themoviedb.org/3/movie/popular?language=fr-FR&page=5`,
        options
      ),
      fetchApp(
        `https://api.themoviedb.org/3/movie/popular?language=fr-FR&page=6`,
        options
      ),
      fetchApp(
        `https://api.themoviedb.org/3/movie/popular?language=fr-FR&page=7`,
        options
      ),
      fetchApp(
        `https://api.themoviedb.org/3/movie/popular?language=fr-FR&page=8`,
        options
      ),
    ]);
    // console.log(prom);
    let allData = [
      ...prom[0].results,
      ...prom[1].results,
      ...prom[2].results,
      ...prom[3].results,
      ...prom[4].results,
      ...prom[5].results,
      ...prom[6].results,
      ...prom[7].results,
    ];
    // console.log(allData);
    return allData;
  } catch (error) {
    console.log(error);
  }
};
const input = document.querySelector("#search");

input.addEventListener("input", () => {
  let load = true;

  // console.log(input.value);
  if (input.value.length >= 2) {
    // console.log("start counting");
    let inputLast = input.value;
    setTimeout(() => {
      if (inputLast === input.value) {
        load = false;
        // console.log("same value");
        GetAllMovies().then((data) => {
          // console.log(data, "data");
          let filter = data.filter((el) => {
            return (
              el.title
                .toLowerCase()
                .includes(input.value.toLowerCase().trim()) ||
              el.original_title
                .toLowerCase()
                .includes(input.value.toLowerCase().trim())
            );
          });
          document.querySelector(".list-search").innerHTML = "";
          filter.length > 0
            ? filter.forEach((el) => {
                let htmlSearch = "";
                htmlSearch = `
            <li class="list-element">
              <a href="./detail.html?id=${el.id}">
                <img src="https://media.themoviedb.org/t/p/w220_and_h330_face${el["poster_path"]}"
                <span>${el.title}</span>
              </a>
            </li>
            `;

                document
                  .querySelector(".list-search")
                  .insertAdjacentHTML("beforeend", htmlSearch);
              })
            : document
                .querySelector(".list-search")
                .insertAdjacentHTML(
                  "beforeend",
                  "<li>Aucun film correspondant</li>"
                );
          // console.log(filter);
        });
      }
    }, 2000);
    if (load) {
      document.querySelector(".list-search").style.display = "block";
      document.querySelector(".list-search").innerHTML = "";
      document
        .querySelector(".list-search")
        .insertAdjacentHTML("beforeend", `<li>patientez...</li>`);
    }
  } else {
    document.querySelector(".list-search").style.display = "none";
    document.querySelector(".list-search").innerHTML = "";
  }
});

renderNews(getMovies, sectionNews);
renderNews(getRatedMovies, sectionRated);
