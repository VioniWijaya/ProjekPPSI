const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

// Di awal models/index.js
console.log('Environment variables:', {
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST
});

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, 
  {
  host: process.env.DB_HOST,
  dialect: 'mysql',
  logging: console.log
});

const db = {};

// Test koneksi
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import models
db.User = require('./User')(sequelize, Sequelize);
db.Dinas = require('./Dinas')(sequelize, Sequelize);
db.Proker = require('./Proker')(sequelize, Sequelize);
db.Progres = require('./Progres')(sequelize, Sequelize);
db.KritikSaran = require('./KritikSaran')(sequelize, Sequelize);
db.Notifikasi = require('./Notifikasi')(sequelize, Sequelize);

// Associations
db.Dinas.belongsTo(db.User, { foreignKey: 'id_user' });
db.Proker.belongsTo(db.Dinas, { foreignKey: 'id_dinas' });
db.Progres.belongsTo(db.Proker, { foreignKey: 'id_proker' });
db.KritikSaran.belongsTo(db.Dinas, { foreignKey: 'id_dinas' });
db.Notifikasi.belongsTo(db.KritikSaran, { foreignKey: 'id_kritikdansaran' });
db.Notifikasi.belongsTo(db.Dinas, { foreignKey: 'id_dinas' });

module.exports = db;
