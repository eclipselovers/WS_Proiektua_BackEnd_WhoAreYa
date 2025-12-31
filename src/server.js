require("dotenv").config();
const express = require("express");
const connectDB  = require("./config/database");
const indexRoutes = require("./routes/index");
const userRoutes = require("./routes/users");
const errorHandler = require("./middlewares/errorHandler");
const path = require("path");



const app = express();
app.use(express.static(path.join(__dirname, 'public')));

app.use("/index", indexRoutes);
app.use("/user", userRoutes);

app.use(errorHandler);

connectDB().then(() => {
    app.listen(3000, () => console.log("Server running on port 3000"));
    console.log("\nhttp://localhost:3000\n");
});
