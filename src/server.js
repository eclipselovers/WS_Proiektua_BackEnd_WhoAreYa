require("dotenv").config();
const express = require("express");
const connectDB  = require("./config/database");
const indexRoutes = require("./routes/index");
const userRoutes = require("./routes/users");
const errorHandler = require("./middlewares/errorHandler");
//dsakldna
const app = express();
app.use(express.json());

app.use("/index", indexRoutes);
app.use("/user", userRoutes);

app.use(errorHandler);

connectDB().then(() => {
    app.listen(3000, () => console.log("HPC server running on port 3000"));
});

