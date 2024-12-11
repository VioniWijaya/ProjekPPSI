const anggota = require('./Anggota');
const anggota_proker = require('./Anggota_proker');
const proker = require('./Proker');
const dinas = require('./Dinas');
const user = require('./User');
const progres = require('./Progres');
const kritik_saran = require('./KritikSaran');
const notifikasi = require('./Notifikasi');

anggota.belongsToMany(proker, { through: anggota_proker, foreignKey: 'id_anggota', as: 'dataProker' });
proker.belongsToMany(anggota, { through: anggota_proker, foreignKey: 'id_proker', as: 'dataAnggota' });

proker.belongsTo(dinas, { foreignKey: 'id_dinas', as: 'dataDinas' });
dinas.hasMany(proker, { foreignKey: 'id_dinas', as: 'dataProker' });

dinas.belongsTo(user, { foreignKey: 'id_user', as: 'dataUser' });
user.hasMany(dinas, { foreignKey: 'id_user', as: 'dataDinas' });

proker.hasMany(progres, { foreignKey: 'id_proker', as: 'dataProgres' });
progres.belongsTo(proker, { foreignKey: 'id_proker', as: 'dataProker' });

progres.hasMany(kritik_saran, { foreignKey: 'id_progres', as: 'dataKritikSaran' });
kritik_saran.belongsTo(progres, { foreignKey: 'id_progres', as: 'dataProgres' });

kritik_saran.hasMany(notifikasi, { foreignKey: 'id_kritiksaran', as: 'dataNotifikasi' });
notifikasi.belongsTo(kritik_saran, { foreignKey: 'id_kritiksaran', as: 'dataKritikSaran' });
