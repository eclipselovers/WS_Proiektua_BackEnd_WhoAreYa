require("dotenv").config();
const express = require("express");
const connectDB = require("./config/database");
const League = require("./models/League");
const Team = require("./models/Team");
const Player = require("./models/Player");
const indexRoutes = require("./routes/index");
const userRoutes = require("./routes/users");
const errorHandler = require("./middlewares/errorHandler");
const path = require("path");

// Sample data for seeding
const seedData = async () => {
    try {
        // Check if we already have data
        const leaguesCount = await League.countDocuments();
        if (leaguesCount === 0) {
            console.log('No data found. Seeding database...');
            
            // Import the seed function
            const { seedDatabase } = require('./seed/seedDatabase');
            await seedDatabase();
        } else {
            console.log('Database already contains data. Skipping seeding.');
        }
    } catch (error) {
        console.error('Error checking/seeding database:', error);
    }
};



const app = express();
app.use(express.static(path.join(__dirname, 'public')));

app.use("/index", indexRoutes);
app.use("/user", userRoutes);

app.use(errorHandler);

// Start the server after database connection is established
connectDB()
    .then(() => seedData()) // Run seed data after successful connection
    .then(() => {
        app.listen(3000, () => {
            console.log("\nServer running on port 3000");
            console.log("http://localhost:3000\n");
        });
    })
    .catch(error => {
        console.error('Failed to start server:', error);
        process.exit(1);
    });
