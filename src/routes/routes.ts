import express from "express";
import Controller from "../controllers/controller";

const controller = new Controller();

const router = express.Router();

router.get("/favorite", controller.getFavorite.bind(controller)); // listagem de favoritos

router.post("/movies", controller.findMovie.bind(controller)); // busca por nome {"movieName": ""}

router.post("/favorite", controller.addFavorite.bind(controller)); // {"imdbID": ""}

router.delete("/favorite/:key", controller.deleteFavorite.bind(controller)); // remove da lista de favoritos

export = router;
