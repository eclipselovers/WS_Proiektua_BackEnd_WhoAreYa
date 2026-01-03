const Team = require('../models/Team');
const League = require('../models/League');

const getTeam = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!id) return res.status(400).json({ success: false, error: { code: 'INVALID_ID', message: 'ID required' } });

        const team = await Team.findById(id).populate('leagueId', 'name code');
        if (!team) return res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Taldea ez da aurkitu' } });

        res.json({ success: true, data: { team }, message: 'Taldea ondo aurkitu da' });
    } catch (error) {
        next(error);
    }
};

module.exports = { getTeam };