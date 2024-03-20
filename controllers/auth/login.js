const { User } = require('../../models')
const Joi = require('joi');
const ErrorResponse = require('../../utils/ErrorResponse');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports = async (req, res) => {
    try {
        const body = req.body;
        const schema = Joi.object({
            password: Joi.string().required(),
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
           res.redirect('/login');
        } else {
            const user = await User.findOne({
                where: {
                    email: body.email
                }
            })
            if (!user) {
                req.flash('alertMessage', 'Invalid credentials');
                req.flash('alertStatus', 'danger');
                res.redirect('/login');
            }
            const compare = await bcrypt.compare(body.password, user.password);
            if (!compare) {
                req.flash('alertMessage', 'Invalid credentials');
                req.flash('alertStatus', 'danger');
                res.redirect('/login');
            }
            const token = jwt.sign({ id: user.id, email: user.email, name: user.name }, process.env.JWT_PRIVATE_KEY, { expiresIn: process.env.JWT_EXPIRED });
            req.session.token = token
            if(user.role == "admin") {
                res.redirect('/admin')
            }else{
                res.redirect('/')
            }
        }
    } catch (error) {
            req.flash('alertMessage', error);
            req.flash('alertStatus', 'danger');
            res.redirect('/login');
    }
}