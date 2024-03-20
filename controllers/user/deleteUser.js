const { User } = require('../../models')
const Joi = require('joi');
const ErrorResponse = require('../../utils/ErrorResponse');


module.exports = async (req, res, next) => {
    try {
        const userId = req.params.id;

        const user = await User.findByPk(parseInt(userId));
        if (!user) {
            return next(new ErrorResponse('user not found', 404));
        }
        user.destroy();
        res.status(201).json({
            status: 'success',
            message: 'Successfully deleted',
        })
        next();
    } catch (error) {
        console.log(error.message);
        req.flash('alertMessage', `${error.message}`);
        req.flash('alertStatus', 'danger');
        res.redirect('/admin/user');
    }
}