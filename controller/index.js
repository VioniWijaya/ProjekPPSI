const progressController = require('./progressController');

module.exports.authController = require('./authController');
module.exports.prokerController = require('./prokerController');
module.exports.userController = require('./userController');
module.exports.progressController = progressController;
module.exports.upload = progressController.upload;  // Tambahkan ini
