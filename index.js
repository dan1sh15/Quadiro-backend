const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const dbConnect = require('./config/database');
const userRoutes = require('./routes/user');
const carRoutes = require('./routes/car');

app.use(express.json());
app.use(
    cors({
        origin: "*",
    })
);
app.use('/api/v1/auth', userRoutes);
app.use('/api/v1', carRoutes);

const PORT = process.env.PORT || 4000;

dbConnect.connect();

app.listen(PORT, (req, res) => {
    console.log(`App is runnning at port: ${PORT}`);
});