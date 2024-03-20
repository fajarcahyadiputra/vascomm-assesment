module.exports = async (req, res, next) => {
    try {
        const alertStatus = req.flash('alertStatus');
        const alertMessage = req.flash('alertMessage');
        const alert        = {message:alertMessage, status: alertStatus};
        res.render('admin/login',{alert, title: "Vascomm | Login",user: req.session.user});
    } catch (error) {
        res.redirect('/admin/login');
    }
}