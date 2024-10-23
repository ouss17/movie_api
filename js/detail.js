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
const getMovieDetail = () => {
  fetchApp(
    "https://api.themoviedb.org/3/movie/movie_id?language=fr-FR",
    options
  );
};
