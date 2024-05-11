const express = require("express");
const authenticate = require("../../middlewares/authenticate");
const authorizeCoordinador = require("../../middlewares/authorize");

const router = express.Router();

router
  .get("/", authenticate, (req, res) => {
    res.send("GET /horarios publico");
  })

router
  .get("/coordinador", authenticate, authorizeCoordinador, (req, res) => {
    res.send("GET /horarios privado coordinador");
  })

module.exports = router;