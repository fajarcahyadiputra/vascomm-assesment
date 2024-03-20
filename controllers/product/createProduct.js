const { Product } = require('../../models')
const Joi = require('joi');
const ErrorResponse = require('../../utils/ErrorResponse');
const moment = require('moment-timezone')

let dateToday = moment.tz("Asia/Jakarta").format('YYYY-MM-DD HH:mm:SS');

module.exports = async (req, res, next) => {
    try {
        if (!req.file) {
            
        }
        const dataBody = req.body;
        const schema = Joi.object({
            name: Joi.string().required(),
            price: Joi.string().required(),
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
           res.redirect('/admin/product');
        }

        dataBody.is_active = 1;
        dataBody.image = "images/"+ req.file.filename
        dataBody.slug = dataBody.name+"-"+Date.now()
        dataBody.created_at = dateToday;
        dataBody.updated_at = dateToday;
        const newtodd = await Product.create(dataBody);
        req.flash('alertMessage', 'Success Create Data');
        req.flash('alertStatus', 'success');
        res.redirect('/admin/product')
    } catch (error) {
        console.log(error.message);
        req.flash('alertMessage', `${error.message}`);
        req.flash('alertStatus', 'danger');
        res.redirect('/admin/product');
    }
}