const { User,  Product} = require('../models')
const Joi = require('joi');

const admin = async (req, res, next) => {
    try {
        const {count: jumlahSemuaUser} = await User.findAndCountAll()
        const {count: jumlahUserAktif} = await User.findAndCountAll({where: {is_active: 1}})
        const {count: jumlahSemuaProduct} = await Product.findAndCountAll()
        const {count: jumlahProductAktif} = await Product.findAndCountAll({where: {is_active: 1}})

        res.render('admin/dashboard/view_dashboard',{
            title: "Vascomm | Dashboard",
            jumlahProductAktif,
            jumlahSemuaProduct,
            jumlahSemuaUser,
            jumlahUserAktif,
        })
    } catch (error) {
        res.redirect('/admin/signin');
    }
}

const user = async (req, res, next) => {
    try {
        const {count, rows: products} = await Product.findAndCountAll({limit: 6})
        const {count: countAktif, rows: productsNew} = await Product.findAndCountAll({order: [["created_at","DESC"]]})

        res.render('user',{
            title: "Vascomm | Dashboard",
          products,
          productsNew,
          baseurl: process.env.BASE_URL
        })
    } catch (error) {
        console.log(error);
        res.redirect('/login');
    }
}

module.exports = {
    admin, user
}