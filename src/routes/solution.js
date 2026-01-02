const express = require('express');
const { getSolutionByGameNumber } = require('../controllers/solutionController');

const router = express.Router();

router.get('/:gameNumber', getSolutionByGameNumber);

module.exports = router;
