// =====Route handlers
let fs = require("fs");
const movies = JSON.parse(fs.readFileSync("./data/movies.json"));
// =======================================================
// GET all the movies
// =======================================================

const getAllMovies = (req, res) => {
  res.status(200).json({
    status: "success",
    count: movies.length,
    data: {
      movies: movies,
    },
  });
};
// =======================================================
// GET A single movie
// =======================================================
const getASingleMovie = (req, res) => {
  const newId = +req.params.id;
  const singleMovie = movies.find((movie) => {
    return movie.id === newId;
  });
  if (!singleMovie) {
    return res.status(404).json({
      status: "Failed",
      message: "Movie with the id: " + newId + "is not found ",
    });
  }
  res.status(200).json({
    status: "success",
    data: {
      movie: singleMovie,
    },
  });
};
// =======================================================
// POST a movie by creating
// =======================================================
const createAMovie = (req, res) => {
  // create movie
  const newId = movies[movies.length - 1].id + 1;
  const newMovie = Object.assign({ id: newId }, req.body);
  movies.push(newMovie);

  fs.writeFile("./data/movies.json", JSON.stringify(movies), (err) => {
    if (err) {
      return res.status(500).json({
        status: "failed",
        message: "Internal Server Error",
      });
    }
    res.status(201).json({
      status: "success",
      data: {
        movie: newMovie,
      },
    });
  });
};
// =======================================================
// PATCH  ->  update a movie data or attribute
// =======================================================
const updateAMovie = (req, res) => {
  const newId = +req.params.id;
  const movieToUpdate = movies.find((movie) => movie.id === newId);
  if (!movieToUpdate) {
    return res.status(404).json({
      status: "failed",
      message: "The movie with the id " + newId + "is not found to update",
    });
  }
  const index = movies.indexOf(movieToUpdate);
  Object.assign(movieToUpdate, req.body); //after mergin this two object it stores in the moveToUpdate variable
  movies[index] = movieToUpdate;
  fs.writeFile("./data/movies.json", JSON.stringify(movies), (err) => {
    if (err) {
      return res.status(500).json({
        status: "failed",
        message: "Internal Server Error",
      });
    }
    res.status(200).json({
      status: "success",
      data: {
        movie: movieToUpdate,
      },
    });
  });
};
// =======================================================
//  DELETE a single movie
// =======================================================
const deleteAMovie = (req, res) => {
  const newId = +req.params.id;
  const movieToDelete = movies.find((movie) => movie.id === newId);
  const movieIndex = movies.indexOf(movieToDelete);
  if (!movieToDelete) {
    return res.status(404).json({
      status: "failed",
      message: "No movie found with the id: " + newId,
    });
  }
  movies.splice(movieIndex, 1);

  fs.writeFile("./data/movies.json", JSON.stringify(movies), (err) => {
    if (err) {
      return res.status(500).json({
        status: "failed",
        message: "Internal Server Error",
      });
    }
    res.status(204).json({
      status: "success",
      data: {
        movie: null,
      },
    });
  });
};

module.exports = {
  getAllMovies,
  getASingleMovie,
  createAMovie,
  updateAMovie,
  deleteAMovie,
};
