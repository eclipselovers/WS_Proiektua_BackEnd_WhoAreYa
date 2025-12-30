const path = require("path");

const getMain = (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
};


module.exports = { getMain };