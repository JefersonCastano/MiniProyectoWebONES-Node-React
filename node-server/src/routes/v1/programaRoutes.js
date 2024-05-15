const express = require("express");
const authenticate = require("../../middlewares/authenticate");
const authorizeCoordinador = require("../../middlewares/authorize");
const programaController = require("../../controllers/programaController");

const router = express.Router();

router
    .get("/:programaId", authenticate, programaController.getProgramaById);

router
    .get("/", authenticate, programaController.getAllProgramas);

router
    .post("/", authenticate, authorizeCoordinador, programaController.createPrograma);

router
    .put("/:programaId", authenticate, authorizeCoordinador, programaController.updatePrograma);

module.exports = router;