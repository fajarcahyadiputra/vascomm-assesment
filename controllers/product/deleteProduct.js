const { Product } = require('../../models')
const ErrorResponse = require('../../utils/ErrorResponse');

module.exports = async (req, res, next) => {
    try {
        const productId = req.params.id;
        const product = await Product.findByPk(productId);
        if (!product) {
            return next(new ErrorResponse(`Product with ID ${productId} Not Found`, 404, "Not Found"));
        }
        await product.destroy();
        res.status(200).json({
            status: 'Success',
            message: 'Success',
            data: {}
        })
        next();
    } catch (error) {
        console.log(error.message);
        req.flash('alertMessage', `${error.message}`);
        req.flash('alertStatus', 'danger');
        res.redirect('/admin/pr');
    }
}