require('dotenv').config();
const express = require('express');
const db = require('./models'); // Import Sequelize setup

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Sinkronisasi database
db.sequelize.sync({ alter: true }).then(() => {
  console.log('Database & tables created!');
}).catch((error) => {
  console.error('Error creating database tables:', error);
});

// Routes (contoh)
app.get('/', (req, res) => {
  res.send('Server is running!');
});

// Mulai server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
