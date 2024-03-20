const { User } = require('../../models')
const Joi = require('joi');


module.exports = async (req, res, next) => {
    try {
        const user = await User.findAll();
        const alertStatus = req.flash('alertStatus');
        const alertMessage = req.flash('alertMessage');
        const alert        = {message:alertMessage, status: alertStatus};
        res.render('admin/user/view_user',{dataUser:user, alert, title: "Vascomm | User",user: req.session.user});
    } catch (error) {
        console.log(error.message);
        req.flash('alertMessage', `${error.message}`);
        req.flash('alertStatus', 'danger');
        res.redirect('/admin/user');
    }
}