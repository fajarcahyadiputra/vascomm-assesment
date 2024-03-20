var express = require('express');
var router = express.Router();
const { createPeroduct, updateProduct, deleteProduct, getsProduct, getProductDetail } = require('../controllers/product');
const authMidleware = require('../midleware/authMidleware');
const {uploadSingle, uploadMultiple}  = require('../midleware/multer');

router.post('/',authMidleware, uploadSingle, createPeroduct);
router.put('/',authMidleware, uploadSingle, updateProduct);
router.get('/',authMidleware, getsProduct);
router.get('/:id',authMidleware, getProductDetail);
router.delete('/:id',authMidleware, deleteProduct);

module.exports = router;
