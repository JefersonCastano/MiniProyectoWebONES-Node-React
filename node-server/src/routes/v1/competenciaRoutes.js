const express = require("express");
const authenticate = require("../../middlewares/authenticate");
const authorizeCoordinador = require("../../middlewares/authorize");
const competenciaController = require("../../controllers/competenciaController");

const router = express.Router();

router
    .get("/genericas", authenticate, authorizeCoordinador, competenciaController.getCompetenciasGenericas);

router
    .get("/:competenciaId", authenticate, competenciaController.getCompetenciaById);

router
    .get("/", authenticate, competenciaController.getAllCompetencias);

router
    .get("/programa/:programaId", authenticate, authorizeCoordinador, competenciaController.getCompetenciasByPrograma);

router
    .post("/", authenticate, authorizeCoordinador, competenciaController.createCompetencia);

router
    .put("/:competenciaId", authenticate, authorizeCoordinador, competenciaController.updateCompetencia);

router
    .put("/:competenciaId/state", authenticate, authorizeCoordinador, competenciaController.updateCompetenciaState);

module.exports = router;