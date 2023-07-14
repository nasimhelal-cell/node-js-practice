const express = require("express");
const {
  getAllMovies,
  getASingleMovie,
  createAMovie,
  updateAMovie,
  deleteAMovie,
} = require("../Controllers/movieControllers");

// dependencies

const router = express.Router();

// Routing section
router.route("/").get(getAllMovies).post(createAMovie);

router
  .route("/:id")
  .get(getASingleMovie)
  .patch(updateAMovie)
  .delete(deleteAMovie);
module.exports = { router };
