const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/schools',    require('./routes/schools'));
app.use('/api/volunteers', require('./routes/volunteers'));
app.use('/api/donations',  require('./routes/donations'));
app.use('/api/feedback',   require('./routes/feedback'));

app.get('/', (req, res) => res.send('EduBridge API running...'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));