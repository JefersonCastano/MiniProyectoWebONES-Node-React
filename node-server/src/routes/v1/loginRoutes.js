const express = require("express");
const router = express.Router();
const loginController = require("../../controllers/loginController");

router
  .post("/", loginController.loginUser)

  /**
   * que devuelo el token?
   * id
   * nombre
   * tipo (rol) 
   */
module.exports = router;