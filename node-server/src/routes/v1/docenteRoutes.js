const express = require("express");
const authenticate = require("../../middlewares/authenticate");
const authorizeCoordinador = require("../../middlewares/authorize");
const docenteController = require("../../controllers/docenteController");

const router = express.Router();

router
  .get("/:docId", authenticate, docenteController.getDocenteById);

router
  .post("/", authenticate, authorizeCoordinador, docenteController.createDocente);

router
  .put("/:docId", authenticate, authorizeCoordinador, docenteController.updateDocente);

router
  .delete("/:docId", authenticate, authorizeCoordinador, docenteController.deleteDocente);

module.exports = router;