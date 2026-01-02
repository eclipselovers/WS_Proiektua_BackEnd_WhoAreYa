const express = require('express');
const { getAllTeams, getTeam } = require('../controllers/teamsController');

const router = express.Router();

router.get('/:id', getTeam);

module.exports = router;
