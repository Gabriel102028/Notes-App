const helpers = {};

helpers.isAuthenticated = (req, res, next) => {
    if(req.isAuthenticated()){
        return next();
    }
    req.flash('error_message', 'Not Autorized');
    res.redirect('/users/signin');
};

module.exports = helpers;