const express = require("express");
const authenticate = require("../../middlewares/authenticate");
const authorizeCoordinador = require("../../middlewares/authorize");
const docenteController = require("../../controllers/docenteController");

const router = express.Router();

router
  .get("/:docId", authenticate, docenteController.getDocenteById);

router
  .get("/", authenticate, docenteController.getAllDocentes);

router
  .post("/", authenticate, authorizeCoordinador, docenteController.createDocente);

router
  .put("/:docId", authenticate, authorizeCoordinador, docenteController.updateDocente);

router
  .put("/:docId/state", authenticate, authorizeCoordinador, docenteController.updateDocenteState);

module.exports = router;