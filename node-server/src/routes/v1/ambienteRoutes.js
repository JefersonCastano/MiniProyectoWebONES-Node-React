const express = require("express");
const authenticate = require("../../middlewares/authenticate");
const authorizeCoordinador = require("../../middlewares/authorize");
const ambienteController = require("../../controllers/ambienteController");

const router = express.Router();

router
    .get("/:ambienteId", authenticate, ambienteController.getAmbienteById);

router
    .get("/", authenticate, ambienteController.getAllAmbientes);

router
    .post("/", authenticate, authorizeCoordinador, ambienteController.createAmbiente);

router
    .put("/:ambienteId", authenticate, authorizeCoordinador, ambienteController.updateAmbiente);

router
    .put("/:ambienteId/state", authenticate, authorizeCoordinador, ambienteController.updateAmbienteState);

router
    .delete("/:ambienteId", authenticate, authorizeCoordinador, ambienteController.deleteAmbiente);

module.exports = router;