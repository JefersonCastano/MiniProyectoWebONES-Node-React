const express = require("express");
const authenticate = require("../../middlewares/authenticate");
const authorizeCoordinador = require("../../middlewares/authorize");
const competenciaController = require("../../controllers/competenciaController");

const router = express.Router();

router
    .get("/:competenciaId", authenticate, competenciaController.getCompetenciaById);

router
    .get("/", authenticate, competenciaController.getAllCompetencias);

router
    .post("/", authenticate, authorizeCoordinador, competenciaController.createCompetencia);

router
    .put("/:competenciaId", authenticate, authorizeCoordinador, competenciaController.updateCompetencia);

router
    .delete("/:competenciaId", authenticate, authorizeCoordinador, competenciaController.deleteCompetencia);

module.exports = router;