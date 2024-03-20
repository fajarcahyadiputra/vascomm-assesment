var express = require('express');
var router = express.Router();
const { createUser, updateUser, deleteUser, getsUser, getUserDetail } = require('../controllers/user');
const authMidleware = require('../midleware/authMidleware');

router.post('/',authMidleware, createUser);
router.put('/',authMidleware, updateUser);
router.delete('/:id',authMidleware, deleteUser);
router.get('/:id',authMidleware, getUserDetail);
router.get('/',authMidleware, getsUser);

module.exports = router;
