const mongoose = require('mongoose');
const { League, Team, Player } = require('../models');
const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');

// Load environment variables from the root .env file
dotenv.config({ path: path.join(__dirname, '../../.env') });

// Sample data for seeding
const leagues = [
    {
        name: 'La Liga',
        code: 'PD',
        country: 'Spain',
        flagUrl: 'https://media-4.api-sports.io/football/leagues/140.png'
    },
    {
        name: 'Premier League',
        code: 'PL',
        country: 'England',
        flagUrl: 'https://media-4.api-sports.io/football/leagues/39.png'
    },
    {
        name: 'Bundesliga',
        code: 'BL1',
        country: 'Germany',
        flagUrl: 'https://media-4.api-sports.io/football/leagues/78.png'
    }
];

// Sample teams data
const teams = [
    // La Liga teams
    { name: 'Real Madrid', country: 'Spain', stadium: 'Santiago Bernabéu' },
    { name: 'FC Barcelona', country: 'Spain', stadium: 'Camp Nou' },
    { name: 'Atletico Madrid', country: 'Spain', stadium: 'Wanda Metropolitano' },
    // Premier League teams
    { name: 'Manchester City', country: 'England', stadium: 'Etihad Stadium' },
    { name: 'Liverpool', country: 'England', stadium: 'Anfield' },
    { name: 'Chelsea', country: 'England', stadium: 'Stamford Bridge' },
    // Bundesliga teams
    { name: 'Bayern Munich', country: 'Germany', stadium: 'Allianz Arena' },
    { name: 'Borussia Dortmund', country: 'Germany', stadium: 'Signal Iduna Park' },
    { name: 'RB Leipzig', country: 'Germany', stadium: 'Red Bull Arena' }
];

// Sample players data
const players = [
    // Real Madrid players
    { name: 'Karim Benzema', position: 'Delantero', number: 9, nationality: 'France' },
    { name: 'Vinicius Junior', position: 'Delantero', number: 20, nationality: 'Brazil' },
    { name: 'Thibaut Courtois', position: 'Portero', number: 1, nationality: 'Belgium' },
    // Barcelona players
    { name: 'Robert Lewandowski', position: 'Delantero', number: 9, nationality: 'Poland' },
    { name: 'Pedri', position: 'Centrocampista', number: 8, nationality: 'Spain' },
    // Manchester City players
    { name: 'Kevin De Bruyne', position: 'Centrocampista', number: 17, nationality: 'Belgium' },
    { name: 'Erling Haaland', position: 'Delantero', number: 9, nationality: 'Norway' },
    // Bayern Munich players
    { name: 'Thomas Müller', position: 'Delantero', number: 25, nationality: 'Germany' },
    { name: 'Joshua Kimmich', position: 'Centrocampista', number: 6, nationality: 'Germany' }
];

const seedDatabase = async () => {
    try {
        // Set default MongoDB URI if not in environment
        const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/whoareya';
        
        // Connect to MongoDB
        console.log('Connecting to MongoDB with URI:', mongoUri);
        await mongoose.connect(mongoUri, {
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
            family: 4,
            autoIndex: true
        });

        console.log('Connected to MongoDB for seeding...');

        // Clear existing data
        await Promise.all([
            League.deleteMany({}),
            Team.deleteMany({}),
            Player.deleteMany({})
        ]);
        console.log('Cleared existing data');

        // Insert leagues
        const createdLeagues = await League.insertMany(leagues);
        console.log(`Inserted ${createdLeagues.length} leagues`);

        // Prepare teams with league references
        const teamsWithLeagues = teams.map((team, index) => {
            // Assign teams to leagues (3 teams per league)
            const leagueIndex = Math.floor(index / 3);
            return {
                ...team,
                leagueId: createdLeagues[leagueIndex]._id,
                logoUrl: `https://media-4.api-sports.io/football/teams/${index + 1}.png`
            };
        });

        // Insert teams
        const createdTeams = await Team.insertMany(teamsWithLeagues);
        console.log(`Inserted ${createdTeams.length} teams`);

        // Prepare players with team and league references
        const playersWithReferences = players.map((player, index) => {
            // Assign players to teams
            const teamIndex = index % createdTeams.length;
            const team = createdTeams[teamIndex];
            
            return {
                ...player,
                teamId: team._id,
                leagueId: team.leagueId,
                birthDate: new Date(1990 + (index % 10), (index % 12), (index % 28) + 1), // Random birth dates
                imageUrl: `https://media-4.api-sports.io/football/players/${100000 + index}.png`
            };
        });

        // Insert players
        const createdPlayers = await Player.insertMany(playersWithReferences);
        console.log(`Inserted ${createdPlayers.length} players`);

        console.log('Database seeded successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

// Run the seed function
seedDatabase();
