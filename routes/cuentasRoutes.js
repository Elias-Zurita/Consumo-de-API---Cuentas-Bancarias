const express = require('express');
const router = express.Router();

// Controller //
const cuentasController = require("../controllers/cuentasController");

router.get("/list", cuentasController.list);
router.get("/detalle/:id", cuentasController.detalle);

module.exports = router;