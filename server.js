const express = require('express');
const connectDB = require('./config/db');
require('dotenv').config();

console.log(process.env);
const app = express();

// Connect DB
connectDB();

// Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/stickers', require('./routes/api/stickers'));
app.use('/api/posts', require('./routes/api/posts'));

app.get('/', (req, res) => res.send('API is Running'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

