const mongoose = require('mongoose');


const leagueSchema = new mongoose.Schema({
    id: {
        type: Number,
        unique: true,
        sparse: true
    },
    name: {
        type: String,
        required: [true, 'Ligaren izena derrigorrezkoa da'],
        trim: true,
        minlength: [2, 'Izenak gutxienez 2 karaktere izan behar ditu'],
        maxlength: [100, 'Izenak ezin du 100 karaktere baino gehiago izan'],
        unique: true
    },
    code: {
        type: String,
        required: [true, 'Ligaren kodea derrigorrezkoa da'],
        trim: true,
        uppercase: true,
        minlength: [2, 'Kodeak gutxienez 2 karaktere izan behar ditu'],
        maxlength: [10, 'Kodeak ezin du 10 karaktere baino gehiago izan'],
        unique: true
    },
    country: {
        type: String,
        required: [true, 'Herrialdea derrigorrezkoa da'],
        trim: true
    },
    
}, {
    timestamps: true
});

module.exports = mongoose.model('League', leagueSchema);