const User = require('../models/User');

function isAuthenticated(req, res, next) {
    console.log('Checking session... userId:', req.session.userId);
    if (!req.session.userId) {
        const isApi = req.path && req.path.startsWith('/api');
        const acceptsJson = req.headers && req.headers.accept && req.headers.accept.indexOf('application/json') !== -1;
        const isXhr = req.xhr || (req.headers && req.headers['x-requested-with'] === 'XMLHttpRequest');
        if (isApi || acceptsJson || isXhr) {
            return res.status(401).json({ success: false, error: { code: 'UNAUTHORIZED', message: 'Not authenticated' } });
        }
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

async function isAdmin(req, res, next){
    const user = await User.findById(req.session.userId);

    if(user.role !== 'admin'){
        const isApi = req.path && req.path.startsWith('/api');
        if (isApi) return res.status(403).json({ success: false, error: { code: 'FORBIDDEN', message: 'Forbidden' } });
        return res.status(403).send('Forbidden');
    }
    next();
}

module.exports = {
    isAuthenticated,
    setUserLocals,
    isAdmin
};