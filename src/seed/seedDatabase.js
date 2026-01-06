const mongoose = require('mongoose');
const League = require('../models/League');
const Team = require('../models/Team');
const Player = require('../models/Player');
const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');


// Load environment variables from the root .env file
dotenv.config({ path: path.join(__dirname, '../../.env') });

// Load JSON source files from public/json
const competitionsPath = path.join(__dirname, '..', 'public', 'json', 'competitions.json');
const teamsPath = path.join(__dirname, '..', 'public', 'json', 'teams.json');
const playersPath = path.join(__dirname, '..', 'public', 'json', 'fullplayers25.json');

let competitionsData = { competitions: [] };
let teamsData = { teams: [] };
let playersData = [];

try {
    const compRaw = fs.readFileSync(competitionsPath, 'utf8');
    competitionsData = JSON.parse(compRaw);
} catch (e) {
    console.warn('Could not read competitions.json, proceeding with empty leagues');
}

try {
    const teamsRaw = fs.readFileSync(teamsPath, 'utf8');
    teamsData = JSON.parse(teamsRaw);
} catch (e) {
    console.warn('Could not read teams.json, proceeding with empty teams');
}

try {
    const playersRaw = fs.readFileSync(playersPath, 'utf8');
    playersData = JSON.parse(playersRaw);
} catch (e) {
    console.warn('Could not read fullplayers25.json, proceeding with empty players');
}

const seedDatabase = async () => {
    try {
        // If not connected, connect (server likely already connected)
        if (mongoose.connection.readyState !== 1) {
            const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/whoareya';
            await mongoose.connect(mongoUri, {
                serverSelectionTimeoutMS: 5000,
                socketTimeoutMS: 45000,
                family: 4,
                autoIndex: true
            });
        }

        // Clear existing data
        await Promise.all([
            League.deleteMany({}),
            Team.deleteMany({}),
            Player.deleteMany({})
        ]);

        // Insert leagues from competitions.json (type === 'LEAGUE')
        const leaguesToInsert = (competitionsData.competitions || []).filter(c => c.type === 'LEAGUE').map(c => ({
            id: c.id,
            name: c.name,
            code: c.code,
            country: c.area && c.area.name ? c.area.name : undefined
        }));

        const createdLeagues = leaguesToInsert.length ? await League.insertMany(leaguesToInsert) : [];

        // Insert teams from teams.json
        const teamsToInsert = (teamsData.teams || []).map(t => ({
            id: t.id,
            name: t.name,
            country: t.address || undefined,
            stadium: t.venue || undefined,
            leagueExternalId: null
        }));

        const createdTeams = teamsToInsert.length ? await Team.insertMany(teamsToInsert) : [];

        // Insert players from fullplayers25.json — fields already match Player schema shape
        const playersToInsert = (playersData || []).map(p => ({
            id: p.id,
            name: p.name,
            birthdate: p.birthdate ? new Date(p.birthdate) : undefined,
            nationality: p.nationality || undefined,
            teamId: p.teamId || null,
            leagueId: p.leagueId || null,
            position: p.position,
            number: p.number || undefined
        }));

        if (playersToInsert.length) {
            // Use insertMany with ordered:false to continue on individual doc errors
            await Player.insertMany(playersToInsert, { ordered: false });
        }

        console.log('Database seeded successfully!');
        return true;
    } catch (error) {
        console.error('Error seeding database:', error);
        throw error;
    }
};

const addTeams = async () => {
    try {
        if (mongoose.connection.readyState !== 1) {
            const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/whoareya';
            await mongoose.connect(mongoUri);
        }

        const existingLeagues = await League.find();
        if (existingLeagues.length === 0) {
            throw new Error('No leagues found. Run seedDatabase first.');
        }

        const teamsWithLeagues = teams.map((team, index) => {
            const leagueIndex = Math.floor(index / 3);
            return {
                ...team,
                leagueId: existingLeagues[leagueIndex % existingLeagues.length]._id
            };
        });

        await Team.insertMany(teamsWithLeagues);
        console.log('Teams added successfully');
        return true;
    } catch (error) {
        console.error('Error adding teams:', error);
        throw error;
    }
};

module.exports = { seedDatabase, addTeams };

// If executed directly, run the seeder
if (require.main === module) {
    seedDatabase()
        .then(() => {
            console.log('Seeding finished.');
            process.exit(0);
        })
        .catch((err) => {
            console.error('Seeding failed:', err);
            process.exit(1);
        });
}


