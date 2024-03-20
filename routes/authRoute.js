var express = require('express');
var router = express.Router();
const login = require('../controllers/auth/login');
const pageLogin = require('../controllers/auth/pageLogin');
const logout = require('../controllers/auth/logout');


router.get('/login', pageLogin);
router.post('/signin', login);
router.get('/logout', logout);

module.exports = router;
