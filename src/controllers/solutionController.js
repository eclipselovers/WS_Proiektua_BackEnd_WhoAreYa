const Player = require('../models/Player');
const Team = require('../models/Team');
const League = require('../models/League');

const getSolutionByGameNumber = async (req, res, next) => {
    try {
        console.log("aaa");
        const gameNumber = parseInt(req.params.gameNumber, 10);

        const total = await Player.countDocuments();
        if (!total) return res.status(404).json({ success: false, message: 'No players available' });

        const days = Math.floor(Date.now() / 86400000);
        let idx = (days + gameNumber) % total;
        if (idx < 0) idx += total;

        const player = await Player.findOne()
            .sort({ name: 1 })
            .skip(idx);

        if (!player) return res.status(404).json({ success: false, message: 'Player not found' });

        const team = player.teamId ? await Team.findOne({ id: player.teamId }) : null;
        const league = player.leagueId ? await League.findOne({ id: player.leagueId }) : null;

        const result = {
            id: player.id || null,
            leagueId: player.leagueId || null,
            teamId: player.teamId || null,
            birthdate: player.birthdate ? (new Date(player.birthdate)).toISOString().slice(0,10) : null,
            name: player.name || null,
            position: player.position || null,
            nationality: player.nationality || null,
            number: player.number || null,
            imageUrl: player.imageUrl || null,
            team: team ? { id: team.id, name: team.name, logoUrl: team.logoUrl } : null,
            league: league ? { id: league.id, name: league.name, code: league.code } : null
        };

        res.json({ success: true, data: { player: result, total }, message: 'Eguneko jokalaria' });
    } catch (error) {
        next(error);
    }
};

const fs = require('fs');
const path = require('path');

const getSolutionList = async (req, res, next) => {
    try {
        const filePath = path.join(__dirname, '..', 'public', 'json', 'solution25.json');
        const raw = await fs.promises.readFile(filePath, 'utf8');
        const arr = JSON.parse(raw);
        res.json({ success: true, data: arr });
    } catch (error) {
        next(error);
    }
};

module.exports = { getSolutionByGameNumber, getSolutionList };
