const { User } = require('../../models')
const Joi = require('joi');
const ErrorResponse = require('../../utils/ErrorResponse');
const bcrypt = require('bcrypt')
const jwtAuth = require('../../helpers/authHelper');

module.exports = async (req, res, next) => {
    try {
        const dataBody = req.body;
        const schema = Joi.object({
            password: Joi.string().required(),
            name: Joi.string().required(),
            role: Joi.string().required(),
            phone_no: Joi.string().required(),
            confirmPassword: Joi.string().valid(Joi.ref('password')).required().messages({
                "any.only": "Confirm password must be match with password"
            }),
            email: Joi.string().email().required(),
        });

        // schema options
        const options = {
            abortEarly: false,
            allowUnknown: true,
            stripUnknown: true
        };
        const { error, value } = schema.validate(req.body, options);

        if (error) {
            let messages = ""
            error.details.forEach(msg => {
                messages += `<p class="text-danger">${msg.message}</p>`
           });
           req.flash('alertMessage', messages);
           req.flash('alertStatus', 'danger');
           res.redirect('/admin/user');
        } else {
            const countEmail = await User.count({ where: { email: dataBody.email } });
            if (countEmail > 0) {
                return next(new ErrorResponse('Email duplicated', 409));
            }
            dataBody.is_active = 1
            dataBody.password = await bcrypt.hash(dataBody.password, 10);
            const newUser = await User.create(dataBody);
            req.flash('alertMessage', 'Success Create Data');
            req.flash('alertStatus', 'success');
            res.redirect('/admin/user')
        }

    } catch (error) {
        console.log(error.message);
        req.flash('alertMessage', `${error.message}`);
        req.flash('alertStatus', 'danger');
        res.redirect('/admin/user');
    }
}