const mongoose = require('mongoose');
const { League, Team } = require('../models');
const path = require('path');
const dotenv = require('dotenv');

// Load environment variables from the root .env file
dotenv.config({ path: path.join(__dirname, '../../.env') });

// Teams data with their respective leagues
const teamsData = [
    // Premier League teams
    { id: 1, name: 'West Ham United', stadium: 'London Stadium', country: 'England', leagueName: 'Premier League' },
    { id: 3, name: 'Sunderland', stadium: 'Stadium of Light', country: 'England', leagueName: 'Premier League' },
    { id: 6, name: 'Tottenham Hotspur', stadium: 'Tottenham Hotspur Stadium', country: 'England', leagueName: 'Premier League' },
    { id: 8, name: 'Liverpool', stadium: 'Anfield', country: 'England', leagueName: 'Premier League' },
    { id: 9, name: 'Manchester City', stadium: 'Etihad Stadium', country: 'England', leagueName: 'Premier League' },
    { id: 11, name: 'Fulham', stadium: 'Craven Cottage', country: 'England', leagueName: 'Premier League' },
    { id: 13, name: 'Everton', stadium: 'Goodison Park', country: 'England', leagueName: 'Premier League' },
    { id: 14, name: 'Manchester United', stadium: 'Old Trafford', country: 'England', leagueName: 'Premier League' },
    { id: 15, name: 'Aston Villa', stadium: 'Villa Park', country: 'England', leagueName: 'Premier League' },
    { id: 18, name: 'Chelsea', stadium: 'Stamford Bridge', country: 'England', leagueName: 'Premier League' },
    { id: 19, name: 'Arsenal', stadium: 'Emirates Stadium', country: 'England', leagueName: 'Premier League' },
    { id: 20, name: 'Newcastle United', stadium: "St James' Park", country: 'England', leagueName: 'Premier League' },
    { id: 27, name: 'Burnley', stadium: 'Turf Moor', country: 'England', leagueName: 'Premier League' },
    { id: 29, name: 'Wolverhampton Wanderers', stadium: 'Molineux Stadium', country: 'England', leagueName: 'Premier League' },
    { id: 51, name: 'Crystal Palace', stadium: 'Selhurst Park', country: 'England', leagueName: 'Premier League' },
    { id: 52, name: 'AFC Bournemouth', stadium: 'Vitality Stadium', country: 'England', leagueName: 'Premier League' },
    { id: 63, name: 'Nottingham Forest', stadium: 'City Ground', country: 'England', leagueName: 'Premier League' },
    { id: 71, name: 'Leeds United', stadium: 'Elland Road', country: 'England', leagueName: 'Premier League' },
    { id: 78, name: 'Brighton & Hove Albion', stadium: 'American Express Stadium', country: 'England', leagueName: 'Premier League' },
    { id: 236, name: 'Brentford', stadium: 'Gtech Community Stadium', country: 'England', leagueName: 'Premier League' },
    
    // La Liga teams
    { id: 36, name: 'Celta Vigo', stadium: 'Balaídos (Abanca-Balaídos)', country: 'Spain', leagueName: 'La Liga' },
    { id: 83, name: 'FC Barcelona', stadium: 'Spotify Camp Nou', country: 'Spain', leagueName: 'La Liga' },
    { id: 93, name: 'Real Oviedo', stadium: 'Estadio Carlos Tartiere', country: 'Spain', leagueName: 'La Liga' },
    { id: 106, name: 'Getafe', stadium: 'Coliseum (Coliseum Alfonso Pérez)', country: 'Spain', leagueName: 'La Liga' },
    { id: 214, name: 'Valencia', stadium: 'Mestalla', country: 'Spain', leagueName: 'La Liga' },
    { id: 231, name: 'Girona', stadium: 'Estadi Montilivi', country: 'Spain', leagueName: 'La Liga' },
    { id: 346, name: 'Real Madrid', stadium: 'Santiago Bernabéu', country: 'Spain', leagueName: 'La Liga' },
    { id: 377, name: 'Rayo Vallecano', stadium: 'Estadio de Vallecas', country: 'Spain', leagueName: 'La Liga' },
    { id: 459, name: 'Osasuna', stadium: 'El Sadar', country: 'Spain', leagueName: 'La Liga' },
    { id: 485, name: 'Real Betis', stadium: 'Estadio Benito Villamarín', country: 'Spain', leagueName: 'La Liga' },
    { id: 528, name: 'RCD Espanyol', stadium: 'RCDE Stadium', country: 'Spain', leagueName: 'La Liga' },
    { id: 594, name: 'Real Sociedad', stadium: 'Reale Arena', country: 'Spain', leagueName: 'La Liga' },
    { id: 645, name: 'Mallorca', stadium: 'Estadi Mallorca Son Moix', country: 'Spain', leagueName: 'La Liga' },
    { id: 676, name: 'Sevilla', stadium: 'Ramón Sánchez Pizjuán', country: 'Spain', leagueName: 'La Liga' },
    { id: 1099, name: 'Elche', stadium: 'Estadio Manuel Martínez Valero', country: 'Spain', leagueName: 'La Liga' },
    { id: 2975, name: 'Deportivo Alavés', stadium: 'Mendizorrotza', country: 'Spain', leagueName: 'La Liga' },
    { id: 3457, name: 'Levante', stadium: 'Estadi Ciutat de València', country: 'Spain', leagueName: 'La Liga' },
    { id: 3477, name: 'Villarreal', stadium: 'Estadio de la Cerámica', country: 'Spain', leagueName: 'La Liga' },
    { id: 7980, name: 'Atlético Madrid', stadium: 'Riyadh Air Metropolitano', country: 'Spain', leagueName: 'La Liga' },
    { id: 13258, name: 'Athletic Club', stadium: 'San Mamés', country: 'Spain', leagueName: 'La Liga' },
    
    // Serie A teams
    { id: 37, name: 'AS Roma', stadium: 'Stadio Olimpico', country: 'Italy', leagueName: 'Serie A' },
    { id: 43, name: 'Lazio', stadium: 'Stadio Olimpico', country: 'Italy', leagueName: 'Serie A' },
    { id: 102, name: 'Genoa', stadium: 'Stadio Luigi Ferraris', country: 'Italy', leagueName: 'Serie A' },
    { id: 109, name: 'Fiorentina', stadium: 'Stadio Artemio Franchi', country: 'Italy', leagueName: 'Serie A' },
    { id: 113, name: 'AC Milan', stadium: 'San Siro (Stadio Giuseppe Meazza)', country: 'Italy', leagueName: 'Serie A' },
    { id: 268, name: 'Como 1907', stadium: 'Stadio Giuseppe Sinigaglia', country: 'Italy', leagueName: 'Serie A' },
    { id: 346, name: 'Udinese', stadium: 'Bluenergy Stadium (Stadio Friuli)', country: 'Italy', leagueName: 'Serie A' },
    { id: 398, name: 'Parma', stadium: 'Stadio Ennio Tardini', country: 'Italy', leagueName: 'Serie A' },
    { id: 585, name: 'Cagliari', stadium: 'Unipol Domus', country: 'Italy', leagueName: 'Serie A' },
    { id: 597, name: 'Napoli', stadium: 'Stadio Diego Armando Maradona', country: 'Italy', leagueName: 'Serie A' },
    { id: 613, name: 'Torino', stadium: 'Stadio Olimpico Grande Torino', country: 'Italy', leagueName: 'Serie A' },
    { id: 625, name: 'Juventus', stadium: 'Allianz Stadium', country: 'Italy', leagueName: 'Serie A' },
    { id: 708, name: 'Atalanta', stadium: 'Gewiss Stadium', country: 'Italy', leagueName: 'Serie A' },
    { id: 1072, name: 'Pisa', stadium: 'Arena Garibaldi – Stadio Romeo Anconetani', country: 'Italy', leagueName: 'Serie A' },
    { id: 1123, name: 'Hellas Verona', stadium: "Stadio Marc'Antonio Bentegodi", country: 'Italy', leagueName: 'Serie A' },
    { id: 2714, name: 'Sassuolo', stadium: 'Mapei Stadium – Città del Tricolore', country: 'Italy', leagueName: 'Serie A' },
    { id: 2930, name: 'Inter', stadium: 'San Siro (Stadio Giuseppe Meazza)', country: 'Italy', leagueName: 'Serie A' },
    { id: 7790, name: 'Lecce', stadium: 'Stadio Via del Mare', country: 'Italy', leagueName: 'Serie A' },
    { id: 8513, name: 'Bologna', stadium: 'Stadio Renato Dall\'Ara', country: 'Italy', leagueName: 'Serie A' },
    { id: 10722, name: 'Cremonese', stadium: 'Stadio Giovanni Zini', country: 'Italy', leagueName: 'Serie A' },
    
    // Ligue 1 teams
    { id: 44, name: 'Olympique de Marseille', stadium: 'Stade Vélodrome', country: 'France', leagueName: 'Ligue 1' },
    { id: 59, name: 'FC Nantes', stadium: 'Stade de la Beaujoire', country: 'France', leagueName: 'Ligue 1' },
    { id: 79, name: 'Olympique Lyonnais', stadium: 'Groupama Stadium', country: 'France', leagueName: 'Ligue 1' },
    { id: 266, name: 'Stade Brestois 29', stadium: 'Stade Francis-Le Blé', country: 'France', leagueName: 'Ligue 1' },
    { id: 271, name: 'RC Lens', stadium: 'Stade Bollaert-Delelis', country: 'France', leagueName: 'Ligue 1' },
    { id: 289, name: 'Toulouse', stadium: 'Stadium de Toulouse', country: 'France', leagueName: 'Ligue 1' },
    { id: 450, name: 'OGC Nice', stadium: 'Allianz Riviera', country: 'France', leagueName: 'Ligue 1' },
    { id: 591, name: 'Paris Saint-Germain', stadium: 'Parc des Princes', country: 'France', leagueName: 'Ligue 1' },
    { id: 598, name: 'Stade Rennais', stadium: 'Roazhon Park', country: 'France', leagueName: 'Ligue 1' },
    { id: 686, name: 'Strasbourg', stadium: 'Stade de la Meinau', country: 'France', leagueName: 'Ligue 1' },
    { id: 690, name: 'Lille', stadium: 'Decathlon Arena – Stade Pierre-Mauroy', country: 'France', leagueName: 'Ligue 1' },
    { id: 776, name: 'Angers', stadium: 'Stade Raymond Kopa', country: 'France', leagueName: 'Ligue 1' },
    { id: 1055, name: 'Le Havre', stadium: 'Stade Océane', country: 'France', leagueName: 'Ligue 1' },
    { id: 3513, name: 'FC Metz', stadium: 'Stade Saint-Symphorien', country: 'France', leagueName: 'Ligue 1' },
    { id: 3682, name: 'AJ Auxerre', stadium: 'Stade de l\'Abbé-Deschamps', country: 'France', leagueName: 'Ligue 1' },
    { id: 4508, name: 'Paris FC', stadium: 'Stade Charléty', country: 'France', leagueName: 'Ligue 1' },
    { id: 6789, name: 'AS Monaco', stadium: 'Stade Louis II', country: 'France', leagueName: 'Ligue 1' },
    { id: 9257, name: 'Lorient', stadium: 'Stade du Moustoir', country: 'France', leagueName: 'Ligue 1' }
];

// League configuration
const leaguesConfig = {
    'Premier League': { code: 'PL', country: 'England' },
    'La Liga': { code: 'PD', country: 'Spain' },
    'Serie A': { code: 'SA', country: 'Italy' },
    'Ligue 1': { code: 'FL1', country: 'France' }
};

const addTeams = async () => {
    try {
        // Set default MongoDB URI if not in environment
        const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/whoareya';
        
        // Connect to MongoDB
        console.log('Connecting to MongoDB...');
        await mongoose.connect(mongoUri, {
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
            family: 4,
            autoIndex: true
        });

        console.log('Connected to MongoDB for adding teams...');

        // Get all existing leagues
        const existingLeagues = await League.find({});
        const leagueMap = new Map(existingLeagues.map(league => [league.name, league._id]));

        // Check and create leagues if they don't exist
        for (const [leagueName, leagueData] of Object.entries(leaguesConfig)) {
            if (!leagueMap.has(leagueName)) {
                console.log(`Creating new league: ${leagueName}`);
                const newLeague = await League.create({
                    name: leagueName,
                    code: leagueData.code,
                    country: leagueData.country,
                    flagUrl: `https://media-4.api-sports.io/football/leagues/${leagueData.code}.png`
                });
                leagueMap.set(leagueName, newLeague._id);
            }
        }

        // Prepare teams for insertion
        const teamsToInsert = [];
        const existingTeams = await Team.find({});
        const existingTeamNames = new Set(existingTeams.map(team => team.name));

        for (const teamData of teamsData) {
            if (!existingTeamNames.has(teamData.name)) {
                teamsToInsert.push({
                    name: teamData.name,
                    country: teamData.country,
                    stadium: teamData.stadium,
                    leagueId: leagueMap.get(teamData.leagueName),
                    logoUrl: `https://media-4.api-sports.io/football/teams/${teamData.id}.png`
                });
            }
        }

        // Insert teams in batches
        const batchSize = 10;
        let insertedCount = 0;

        for (let i = 0; i < teamsToInsert.length; i += batchSize) {
            const batch = teamsToInsert.slice(i, i + batchSize);
            const result = await Team.insertMany(batch, { ordered: false });
            insertedCount += result.length;
            console.log(`Inserted ${result.length} teams (${insertedCount}/${teamsToInsert.length})`);
        }

        console.log(`\nSuccessfully added ${insertedCount} new teams to the database`);
        console.log('Total teams in database:', await Team.countDocuments());

    } catch (error) {
        console.error('Error adding teams:', error);
    } finally {
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
    }
};

// Run the function
addTeams();
