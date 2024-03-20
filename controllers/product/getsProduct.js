const { Product } = require('../../models')
const ErrorResponse = require('../../utils/ErrorResponse');
const datatable = require('../../utils/datatable')


module.exports = async (req, res, next) => {
    try {
        const product = await Product.findAll();
        const alertStatus = req.flash('alertStatus');
        const alertMessage = req.flash('alertMessage');
        const alert        = {message:alertMessage, status: alertStatus};
        res.render('admin/product/view_product',{product,baseurl: process.env.BASE_URL, alert, title: "Vascomm | Product",user: req.session.user});
        next();
    } catch (error) {
        console.log(error.message);
        req.flash('alertMessage', `${error.message}`);
        req.flash('alertStatus', 'danger');
        res.redirect('/admin/user');
    }
}