const path = require("path");
const mongoose = require('mongoose');
const Player = require('../models/Player');
const Team = require('../models/Team');
const League = require('../models/League');


const getAllPlayers = async (req, res, next) => {
    try {
        const hasPage = typeof req.query.page !== 'undefined';
        const hasLimit = typeof req.query.limit !== 'undefined';

        if (!hasPage && !hasLimit) {
            const players = await Player.find().sort({ name: 1 });

            // batch fetch teams and leagues by external ids
            const teamIds = [...new Set(players.map(p => p.teamId).filter(Boolean))];
            const leagueIds = [...new Set(players.map(p => p.leagueId).filter(Boolean))];

            const teams = teamIds.length ? await Team.find({ id: { $in: teamIds } }) : [];
            const leagues = leagueIds.length ? await League.find({ id: { $in: leagueIds } }) : [];

            const teamsMap = new Map(teams.map(t => [t.id, t]));
            const leaguesMap = new Map(leagues.map(l => [l.id, l]));

            const formatted = players.map(p => formatPlayerResponse(p, teamsMap, leaguesMap));

            return res.json({ success: true, data: formatted, message: 'Jokalariak arrakastaz lortu dira' });
        }

        let page = parseInt(req.query.page, 10) || 1;
        let limit = parseInt(req.query.limit, 10) || 10;

        if (page < 1) page = 1;
        if (limit < 1) limit = 10;

        const skip = (page - 1) * limit;

        const [total, players] = await Promise.all([
            Player.countDocuments(),
            Player.find()
                .sort({ name: 1 })
                .skip(skip)
                .limit(limit)
        ]);

        const teamIds = [...new Set(players.map(p => p.teamId).filter(Boolean))];
        const leagueIds = [...new Set(players.map(p => p.leagueId).filter(Boolean))];

        const teams = teamIds.length ? await Team.find({ id: { $in: teamIds } }) : [];
        const leagues = leagueIds.length ? await League.find({ id: { $in: leagueIds } }) : [];

        const teamsMap = new Map(teams.map(t => [t.id, t]));
        const leaguesMap = new Map(leagues.map(l => [l.id, l]));

        const formattedPlayers = players.map(p => formatPlayerResponse(p, teamsMap, leaguesMap));

        const totalPages = Math.ceil(total / limit);

        res.json({ success: true, data: { total, page, totalPages, limit, players: formattedPlayers }, message: 'Jokalariak arrakastaz lortu dira' });
    } catch (error) {
        next(error);
    }
};

const getPlayer = async (req, res, next) => {
    try {
        const id = req.params.id;

        let player = null;
        if (/^\d+$/.test(id)) {
            player = await Player.findOne({ id: Number(id) });
        } else {
            player = await Player.findById(id);
        }

        if (!player) return res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Jokalaria ez da aurkitu', details: [] } });

        // fetch team/league
        const team = player.teamId ? await Team.findOne({ id: player.teamId }) : null;
        const league = player.leagueId ? await League.findOne({ id: player.leagueId }) : null;

        const formatted = formatPlayerResponse(player, new Map([[player.teamId, team]]), new Map([[player.leagueId, league]]));

        res.json({ success: true, data: { player: formatted }, message: 'Jokalaria ondo atzitu da' });
    } catch (error) {
        next(error);
    }
};

const createPlayer = async (req, res, next) => {
    try {
        const data = req.body;

        const player = new Player(data);
        await player.save();

        // fetch team/league for response
        const team = player.teamId ? await Team.findOne({ id: player.teamId }) : null;
        const league = player.leagueId ? await League.findOne({ id: player.leagueId }) : null;

        const formatted = formatPlayerResponse(player, new Map([[player.teamId, team]]), new Map([[player.leagueId, league]]));

        res.status(201).json({ success: true, data: formatted, message: 'Jokalaria arrakastaz sortua' });
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                success: false,
                error: {
                    code: 'VALIDATION_ERROR',
                    message: 'Datu baliogabeak',
                    details: Object.keys(error.errors).map(k => ({ param: k, msg: error.errors[k].message }))
                }
            });
        }
        next(error);
    }
};

const updatePlayer = async (req, res, next) => {
    try {
        const { id } = req.params;

        // resolve by external numeric id or by ObjectId
        let player = null;
        if (/^\d+$/.test(id)) {
            player = await Player.findOne({ id: Number(id) });
        } else if (mongoose.Types.ObjectId.isValid(id)) {
            player = await Player.findById(id);
        } else {
            return res.status(400).json({ success: false, error: { code: 'INVALID_ID', message: 'ID inválido', details: [] } });
        }

        if (!player) return res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Jokalaria ez da aurkitu', details: [] } });

        Object.keys(req.body).forEach(key => { player[key] = req.body[key]; });
        await player.save();

        const team = player.teamId ? await Team.findOne({ id: player.teamId }) : null;
        const league = player.leagueId ? await League.findOne({ id: player.leagueId }) : null;

        const formatted = formatPlayerResponse(player, new Map([[player.teamId, team]]), new Map([[player.leagueId, league]]));

        res.json({ success: true, data: formatted, message: 'Jokalaria arrakastaz eguneratua' });
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                success: false,
                error: {
                    code: 'VALIDATION_ERROR',
                    message: 'Datu baliogabeak',
                    details: Object.keys(error.errors).map(k => ({ param: k, msg: error.errors[k].message }))
                }
            });
        }
        next(error);
    }
};

const deletePlayer = async (req, res, next) => {
    try {
        const { id } = req.params;

        let removed = null;
        if (/^\d+$/.test(id)) {
            removed = await Player.findOneAndDelete({ id: Number(id) });
        } else if (mongoose.Types.ObjectId.isValid(id)) {
            removed = await Player.findByIdAndDelete(id);
        } else {
            return res.status(400).json({ success: false, error: { code: 'INVALID_ID', message: 'ID inválido', details: [] } });
        }

        if (!removed) return res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Jokalaria ez da aurkitu', details: [] } });

        res.json({ success: true, data: { id: removed.id || removed._id }, message: 'Jokalaria ezabatu da' });
    } catch (error) {
        next(error);
    }
};

// Helper: format player document to match JSON shape and include team/league basic info
function formatPlayerResponse(playerDoc, teamsMap = new Map(), leaguesMap = new Map()) {
    const p = playerDoc.toObject ? playerDoc.toObject() : playerDoc;
    const team = teamsMap.get(p.teamId) || null;
    const league = leaguesMap.get(p.leagueId) || null;

    return {
        id: p.id || null,
        leagueId: p.leagueId || null,
        teamId: p.teamId || null,
        birthdate: p.birthdate ? (new Date(p.birthdate)).toISOString().slice(0,10) : null,
        name: p.name || null,
        position: p.position || null,
        nationality: p.nationality || null,
        number: p.number || null,
        team: team ? { id: team.id, name: team.name } : null,
        league: league ? { id: league.id, name: league.name, code: league.code } : null
    };
}



module.exports = { getAllPlayers, getPlayer, createPlayer, updatePlayer, deletePlayer };