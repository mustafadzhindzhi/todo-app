const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes/NoteRoute')

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

const PORT = 3000;

mongoose.connect('mongodb://127.0.0.1:27017/Notes');

app.listen(PORT, () => console.log(`Listening on ${PORT}`));