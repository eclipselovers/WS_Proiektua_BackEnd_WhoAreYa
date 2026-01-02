const League = require('../models/League');

const getAllLeagues = async (req, res, next) => {
    try {
        const leagues = await League.find().sort({ name: 1 });
        res.json({ success: true, data: { leagues }, message: 'Ligak arrakastaz lortu dira' });
    } catch (error) {
        next(error);
    }
};

module.exports = { getAllLeagues };
