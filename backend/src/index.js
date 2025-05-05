const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('../config/db');
const userRoutes = require('../routes/userRoutes'); // ✅ Make sure this is correct path
const cors = require('cors');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json()); // ✅ Needed to parse JSON bodies

// ✅ Route setup
app.use('/api/users', userRoutes); // This means POST /api/users/login goes to userRoutes

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
