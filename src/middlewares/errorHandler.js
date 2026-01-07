const { body, validationResult } = require('express-validator');

const playerValidators = [
	body('name').isString().isLength({ min: 2, max: 100 }).trim().withMessage('name invalid'),
	body('birthdate').isISO8601().toDate().custom(val => val < new Date()).withMessage('birthdate must be in the past'),
	body('nationality').isString().notEmpty().trim().withMessage('nationality required'),
	body('teamId').isInt({ min: 0 }).toInt().withMessage('teamId must be a numeric id'),
	body('leagueId').isInt({ min: 0 }).toInt().withMessage('leagueId must be a numeric id'),
	body('position').isIn(['GK','DF','MF','FW']).withMessage('invalid position'),
	body('number').optional().isInt({ min: 1, max: 99 }).withMessage('number 1-99'),
    // imageUrl removed: images are local
];

const playerValidatorsForUpdate = [
	body('name').optional().isString().isLength({ min: 2, max: 100 }).trim().withMessage('name invalid'),
	body('birthdate').optional().isISO8601().toDate().custom(val => val < new Date()).withMessage('birthdate must be in the past'),
	body('nationality').optional().isString().notEmpty().trim().withMessage('nationality required'),
	body('teamId').optional().isInt({ min: 0 }).toInt().withMessage('teamId must be a numeric id'),
	body('leagueId').optional().isInt({ min: 0 }).toInt().withMessage('leagueId must be a numeric id'),
	body('position').optional().isIn(['GK','DF','MF','FW']).withMessage('invalid position'),
	body('number').optional().isInt({ min: 1, max: 99 }).withMessage('number 1-99'),
	// imageUrl removed: images are local
];

const validateRequest = (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({
			success: false,
			error: {
				code: 'VALIDATION_ERROR',
				message: 'Datu baliogabeak',
				details: errors.array().map(e => ({ param: e.param, msg: e.msg, value: e.value }))
			}
		});
	}
	next();
};

const errorHandler = (err, req, res, next) => {
    console.error("[ERROR]", err);

    if (err.name === "ValidationError") {
        return res.status(400).json({
            message: "Validation error",
            details: err.message
        });
    }

    if (err.name === "CastError") {
        return res.status(400).json({ message: "Invalid ID format" });
    }

    res.status(500).json({ message: "Internal server error" });
};


module.exports = { errorHandler, playerValidators, playerValidatorsForUpdate, validateRequest };
