const express = require('express');
const { getAllLeagues } = require('../controllers/leaguesController');

const router = express.Router();

router.get('/', getAllLeagues);

module.exports = router;
