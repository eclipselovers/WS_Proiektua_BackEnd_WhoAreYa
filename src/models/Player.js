const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
    id: {
        type: Number,
        unique: true,
        sparse: true
    },
    name: {
        type: String,
        required: [true, 'Jokalariaren izena derrigorrezkoa da'],
        trim: true,
        minlength: [2, 'Izenak gutxienez 2 karaktere izan behar ditu'],
        maxlength: [100, 'Izenak ezin du 100 karaktere baino gehiago izan']
    },
    birthdate: {
        type: Date,
        required: [true, 'Jaiotze-data derrigorrezkoa da'],
        validate: {
            validator: function(value) {
                return value < new Date();
            },
            message: 'Jaiotze-data gaur egungo data baino lehenagokoa izan behar da'
        }
    },
    nationality: {
        type: String,
        required: [true, 'Nazionalitatea derrigorrezkoa da'],
        trim: true
    },
    teamId: {
        type: Number,
        required: [true, 'Taldearen ID-a derrigorrezkoa da']
    },
    leagueId: {
        type: Number,
        required: [true, 'Ligaren ID-a derrigorrezkoa da']
    },
    position: {
        type: String,
        required: [true, 'Postua derrigorrezkoa da'],
        enum: {
            values: ['GK', 'DF', 'MF', 'FW'],
            message: "Postu baliogabea. Onartutako balioak: GK, DF, MF, FW"
        }
    },
    number: {
        type: Number,
        min: [1, 'Zenbakia gutxienez 1 izan behar da'],
        max: [99, 'Zenbakia ezin da 99 baino handiagoa izan']
    },
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

module.exports = mongoose.model('Player', playerSchema);