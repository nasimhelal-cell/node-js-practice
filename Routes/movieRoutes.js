const {
  getAllMovies,
  getASingleMovie,
  createAMovie,
  updateAMovie,
  deleteAMovie,
} = require("../Controllers/moviesController");
let express = require("express");

const router = express.Router();

router.route("/").get(getAllMovies).post(createAMovie);
router
  .route("/:id")
  .get(getASingleMovie)
  .patch(updateAMovie)
  .delete(deleteAMovie);

module.exports = { router };
