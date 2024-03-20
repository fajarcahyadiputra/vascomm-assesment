const { User } = require('../../models')
const Joi = require('joi');
const ErrorResponse = require('../../utils/ErrorResponse');


module.exports = async (req, res, next) => {
    try {
        const dataBody = req.body;
        const userId = req.params.id;

        const schema = Joi.object({
            password: Joi.string().optional(),
            name: Joi.string().optional(),
            email: Joi.string().email().optional(),
            is_active: Joi.number().optional(),
            phone_no: Joi.string().optional(),
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
            const user = await User.findByPk(parseInt(userId));
            if (dataBody.email) {
                const countEmail = await User.count({ where: { email: dataBody.email } });
                if (countEmail > 0) {
                    req.flash('alertMessage', `Email duplicate`);
                    req.flash('alertStatus', 'danger');
                    res.redirect('/admin/user');
                }
            }
            
            
            Object.keys(dataBody).forEach(key => (user[key] = dataBody[key]))
           await user.save()
            req.flash('alertMessage', 'Success Edit Data');
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