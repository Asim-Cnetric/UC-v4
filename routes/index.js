const express = require("express");
const router = express.Router();

router.use('/users', require('./userRoutes'));
router.use('/users/templates', require('./templateRoutes'));
router.use('/entities', require('./entityRoutes'));

module.exports = router;