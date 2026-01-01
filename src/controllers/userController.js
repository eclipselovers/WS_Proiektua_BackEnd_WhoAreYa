const path = require("path");


const getMainUser = async (req, res, next) => {
    res.sendFile(path.join(__dirname, 'public', 'user.html'));
};

const postLogout = async (req, res, next) => {
    req.session.destroy();
    res.redirect('/login');
};


module.exports = { getMainUser, postLogout };