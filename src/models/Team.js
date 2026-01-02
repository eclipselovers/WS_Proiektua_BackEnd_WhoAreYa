const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'El nombre del equipo es obligatorio'],
        trim: true,
        minlength: [2, 'El nombre debe tener al menos 2 caracteres'],
        maxlength: [100, 'El nombre no puede exceder los 100 caracteres'],
        unique: true
    },
    leagueId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'League',
        required: [true, 'El ID de la liga es obligatorio']
    },
    logoUrl: {
        type: String,
        trim: true,
        match: [/^https?:\/\//, 'La URL del logo debe comenzar con http:// o https://']
    },
    country: {
        type: String,
        required: [true, 'El país es obligatorio'],
        trim: true
    },
    stadium: {
        type: String,
        trim: true,
        maxlength: [200, 'El nombre del estadio no puede exceder los 200 caracteres']
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Team', teamSchema);

