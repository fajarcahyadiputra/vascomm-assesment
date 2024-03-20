const Bank = require('../models/Bank');
const fs   = require('fs-extra');
const path = require('path');

module.exports = {
    viewBank: async (req, res)=>{
        const alertStatus = req.flash('alertStatus');
        const alertMessage = req.flash('alertMessage');
        const alert        = {message:alertMessage, status: alertStatus};
        const bank = await  Bank.find();
        res.render('admin/bank/view_bank',{bank, alert, title: "Staycation | Bank",user: req.session.user});
    },
}