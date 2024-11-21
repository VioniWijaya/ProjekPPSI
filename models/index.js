const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
});

const db = {};

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
