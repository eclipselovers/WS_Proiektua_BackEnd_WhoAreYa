require("dotenv").config();
const express = require("express");
const connectDB = require("./config/database");
const League = require("./models/League");
const Team = require("./models/Team");
const Player = require("./models/Player");
const indexRoutes = require("./routes/index");
const userRoutes = require("./routes/users");
const adminRoutes = require("./routes/admin");
const errorHandler = require("./middlewares/errorHandler");
const path = require("path");
const cookieParser = require('cookie-parser');
const session = require('express-session');
const logger = require('morgan');
const { seedDatabase } = require('./seed/seedDatabase');

// Sample data for seeding
const seedData = async () => {
    try {
        // Check if we already have data
        const leaguesCount = await League.countDocuments();
        if (leaguesCount === 0) {
            console.log('No data found. Seeding database...');

            await seedDatabase();
        } else {
            console.log('Database already contains data. Skipping seeding.');
        }
    } catch (error) {
        console.error('Error checking/seeding database:', error);
    }
};



const app = express();

const {setUserLocals} = require('./middlewares/auth');
app.use(setUserLocals);
app.use(express.static(path.join(__dirname, 'public')));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
    secret: process.env.SESSION_SECRET || 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: process.env.NODE_ENV === 'production' }
}));


app.use("/", indexRoutes);
app.use("/user", userRoutes);
app.use("/admin", adminRoutes);

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
