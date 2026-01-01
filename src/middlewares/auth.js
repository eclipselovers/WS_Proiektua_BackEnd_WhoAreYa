function isAuthenticated(req, res, next) {
    console.log('Checking session... userId:', req.session.userId);
    if (!req.session.userId) {
        console.log('No user logged in, redirecting to /auth/login');
        req.session.error = 'Hori egiteko sesioa hasi beharra duzu'
        return res.redirect('/login');
    }
    console.log('User is authenticated, proceeding');
    next();
}
// userId bista guztietan atzigarri egoteko middleware.a
function setUserLocals(req, res, next) {
    res.locals.userId = (req.session && req.session.userId) ? req.session.userId : null;
    next();
}

function isAdmin(req, res, next){
    if(req.session.user.role !== 'admin'){
        return res.status(403).send('Forbidden');
    }
    next();
}

module.exports = {
    isAuthenticated,
    setUserLocals,
    isAdmin
};