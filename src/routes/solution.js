const express = require('express');
const { getSolutionByGameNumber, getSolutionList } = require('../controllers/solutionController');

const router = express.Router();

router.get('/', getSolutionList);
router.get('/:gameNumber', getSolutionByGameNumber);

module.exports = router;
