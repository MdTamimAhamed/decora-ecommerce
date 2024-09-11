const multer = require('multer');

const storage = multer.memoryStorage();

const sellerUploads = multer({ storage: storage });

module.exports = {
	sellerUploads,
};
