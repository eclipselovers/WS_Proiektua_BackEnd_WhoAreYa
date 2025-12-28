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

module.exports = errorHandler;
