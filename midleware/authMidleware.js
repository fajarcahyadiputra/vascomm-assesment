const jwt = require('jsonwebtoken');
const { JWT_PRIVATE_KEY } = process.env;

module.exports = (req, res, next) => {
    try {
        if(req.session.token == null || req.session.token == undefined){
            req.flash('alertMessage', 'session is experied please login again');
            req.flash('alertStatus', 'warning');
            res.redirect('/login');
        }
        let token = req.session.token;
        jwt.verify(token, JWT_PRIVATE_KEY, (err, data) => {
            if (err) {
                req.flash('alertMessage', 'session is experied please login again');
                req.flash('alertStatus', 'warning');
                res.redirect('/login');
            }
            req.user = {
                name: data.name,
                email: data.email,
                id: data.id
            }

            res.locals.email = data.email;
            res.locals.name = data.name;
            next();
        })
    } catch (error) {
        req.flash('alertMessage', 'session is experied please login again');
        req.flash('alertStatus', 'warning');
        res.redirect('/login');
    }
}