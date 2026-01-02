const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
    id: {
        type: Number,
        unique: true,
        sparse: true
    },
    name: {
        type: String,
        required: [true, 'El nombre del jugador es obligatorio'],
        trim: true,
        minlength: [2, 'El nombre debe tener al menos 2 caracteres'],
        maxlength: [100, 'El nombre no puede exceder los 100 caracteres']
    },
    // Field name adjusted to match fullplayers25.json ("birthdate")
    birthdate: {
        type: Date,
        required: [true, 'La fecha de nacimiento es obligatoria'],
        validate: {
            validator: function(value) {
                return value < new Date();
            },
            message: 'La fecha de nacimiento debe ser anterior a la fecha actual'
        }
    },
    nationality: {
        type: String,
        required: [true, 'La nacionalidad es obligatoria'],
        trim: true
    },
    // Use numeric external IDs as present in fullplayers25.json
    teamId: {
        type: Number,
        required: [true, 'El ID del equipo es obligatorio']
    },
    leagueId: {
        type: Number,
        required: [true, 'El ID de la liga es obligatorio']
    },
    // Position values in the JSON are abbreviated (GK, DF, MF, FW)
    position: {
        type: String,
        required: [true, 'La posición es obligatoria'],
        enum: {
            values: ['GK', 'DF', 'MF', 'FW'],
            message: 'Posición no válida. Valores permitidos: GK, DF, MF, FW'
        }
    },
    number: {
        type: Number,
        min: [1, 'El número debe ser al menos 1'],
        max: [99, 'El número no puede ser mayor que 99']
    },
    imageUrl: {
        type: String,
        trim: true,
        match: [/^https?:\/\//, 'La URL de la imagen debe comenzar con http:// o https://']
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

module.exports = mongoose.model('Player', playerSchema);