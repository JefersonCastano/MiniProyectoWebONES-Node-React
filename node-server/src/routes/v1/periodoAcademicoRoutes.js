const express = require("express");
const authenticate = require("../../middlewares/authenticate");
const authorizeCoordinador = require("../../middlewares/authorize");
const periodoAcademicoController = require("../../controllers/periodoAcademicoController");

const router = express.Router();

router
    .get("/:periodoId", authenticate, periodoAcademicoController.getPeriodoAcademicoById);

router
    .get("/", authenticate, periodoAcademicoController.getAllPeriodosAcademicos);

router
    .post("/", authenticate, authorizeCoordinador, periodoAcademicoController.createPeriodoAcademico);

router
    .put("/:periodoId", authenticate, authorizeCoordinador, periodoAcademicoController.updatePeriodoAcademico);

router
    .put("/:periodoId/state", authenticate, authorizeCoordinador, periodoAcademicoController.updatePeriodoAcademicoState);

router
    .delete("/:periodoId", authenticate, authorizeCoordinador, periodoAcademicoController.deletePeriodoAcademico);

module.exports = router;