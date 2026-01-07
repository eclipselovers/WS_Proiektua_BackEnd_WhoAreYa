const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
    id: {
        type: Number,
        unique: true,
        sparse: true
    },
    leagueExternalId: {
        type: Number,
        sparse: true
    },
    name: {
        type: String,
        required: [true, 'Taldearen izena derrigorrezkoa da'],
        trim: true,
        minlength: [2, 'Izenak gutxienez 2 karaktere izan behar ditu'],
        maxlength: [100, 'Izenak ezin du 100 karaktere baino gehiago izan'],
        unique: true
    },
    leagueId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'League'
    },
    country: {
        type: String,
        required: [true, 'Herrialdea derrigorrezkoa da'],
        trim: true
    },
    stadium: {
        type: String,
        trim: true,
        maxlength: [200, 'Estadioko izenak ezin du 200 karaktere baino gehiago izan']
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Team', teamSchema);

