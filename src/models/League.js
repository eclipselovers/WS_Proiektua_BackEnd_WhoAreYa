const mongoose = require('mongoose');


const leagueSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'El nombre de la liga es obligatorio'],
        trim: true,
        minlength: [2, 'El nombre debe tener al menos 2 caracteres'],
        maxlength: [100, 'El nombre no puede exceder los 100 caracteres'],
        unique: true
    },
    code: {
        type: String,
        required: [true, 'El código de la liga es obligatorio'],
        trim: true,
        uppercase: true,
        minlength: [2, 'El código debe tener al menos 2 caracteres'],
        maxlength: [10, 'El código no puede exceder los 10 caracteres'],
        unique: true
    },
    country: {
        type: String,
        required: [true, 'El país es obligatorio'],
        trim: true
    },
    flagUrl: {
        type: String,
        trim: true,
        match: [/^https?:\/\//, 'La URL de la bandera debe comenzar con http:// o https://']
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('League', leagueSchema);