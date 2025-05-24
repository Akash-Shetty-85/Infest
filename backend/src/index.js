const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('../config/db');
const userRoutes = require('../routes/userRoutes'); // ✅ Make sure this is correct path
const eventRoutes = require('../routes/eventRoutes'); // ✅ Make sure this is correct path
const registerRoutes = require('../routes/registerRoutes'); // ✅ Make sure this is correct path
const cors = require('cors');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json()); // ✅ Needed to parse JSON bodies

// ✅ Route setup
app.use('/api/users', userRoutes); // This means POST /api/users/login goes to userRoutes
app.use('/api/events', eventRoutes)
app.use('/api/registerEvent',registerRoutes)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
