module.exports = async (req, res, next) => {
    try {
        req.session.destroy();
        res.redirect('/login');
    } catch (error) {
        res.redirect('/login');
    }
}