var express = require('express');
const dashboard = require('../controllers/dashboard');
const authMidleware = require('../midleware/authMidleware');
var router = express.Router();

/* GET home page. */
router.get('/admin', authMidleware, dashboard.admin);
router.get('/', dashboard.user);


module.exports = router;