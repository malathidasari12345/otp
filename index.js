const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const db = require("./database/db")
db()
const port = process.env.PORT || 8080; 
const authroute = require('./routes/Auth')
app.use(cors());
app.use(express.json());

// Root route
app.get("/", (req, res) => {
    res.send("Welcome");
});
app.use("/api/auth", authroute)


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
