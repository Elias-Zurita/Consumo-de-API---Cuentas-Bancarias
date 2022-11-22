const express = require('express');
const router = express.Router();

// Controller //
const cuentasControllerApi = require("../controllers/cuentasControllerApi");

router.get("/", cuentasControllerApi.list);

module.exports = router;