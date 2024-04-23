const express = require('express');
const authRoutes = require('../src/routes/authRoutes.js');
const postRoutes = require('../src/routes/postRoutes.js');

const app = express();

app.use(express.json());

app.use('/auth', authRoutes);
app.use('/api/posts', postRoutes); 

module.exports = app;
