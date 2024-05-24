const express = require("express");
const authenticate = require("../../middlewares/authenticate");
const authorizeCoordinador = require("../../middlewares/authorize");
const horarioController = require("../../controllers/horarioController");

const router = express.Router();

router
  .get("/:perId/ambientes/:dia/:horaInicio", authenticate, horarioController.getAvailableAmbientesByDiaHoraInicio);

router
  .get("/:perId/:docId", authenticate, horarioController.getHorarioByPerAndDocId);

router
  .post("/", authenticate, authorizeCoordinador, horarioController.createHorario);

router
  .put("/:perId/:docId", authenticate, authorizeCoordinador, horarioController.updateHorario);

router
  .delete("/:perId/:docId", authenticate, authorizeCoordinador, horarioController.deleteHorario);

module.exports = router;