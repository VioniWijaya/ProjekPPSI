require('dotenv').config();
const express = require('express');
const db = require('./config/db');
// const db = require('./models'); // Import Sequelize setup
const path = require('path'); 
const app = express();
const cookieParser = require("cookie-parser");
const logger = require('morgan');
const PORT = process.env.PORT || 3000;

// const authRouter = require("./routes/authRoute");
const router = require('./routes');

//View Engine setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// // Sinkronisasi database
// db.sequelize.sync({ alter: true }).then(() => {
//   console.log('Database & tables created!');
// }).catch((error) => {
//   console.error('Error creating database tables:', error);
// });

// Routes
app.use("/", router);
// app.get('/', (req, res) => {
//   res.render('login');
// });

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).render('error', {
      message: err.message, // Kirim pesan kesalahan
      error: err // Kirim objek kesalahan
  });
});

module.exports = app;

// // Routes (contoh)
// // app.get('/', (req, res) => {
// //   res.send('Server is running!');
// // });
// app.get("/", authRouter);

// app.get("*", (req, res) => {
//   res.status(404).render("notfound");
// });

// Mulai server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app; 