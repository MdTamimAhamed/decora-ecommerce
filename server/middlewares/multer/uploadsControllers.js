const multer = require('multer');

const storage = multer.memoryStorage();

const sellerUploads = multer({
	storage: storage,
	limits: { fileSize: 5 * 1000 * 1000 },
});

module.exports = {
	sellerUploads,
};
