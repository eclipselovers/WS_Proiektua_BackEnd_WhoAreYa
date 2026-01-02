const path = require("path");


const getMainAdmin = async (req, res, next) => {
    res.sendFile(path.join(__dirname, '..','public', 'admin.html'));
};


module.exports = { getMainAdmin };