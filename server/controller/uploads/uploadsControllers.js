const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
	destination: function (req, res, cb) {
		const storagePath = path.join(
			__dirname,
			'../..',
			'/public',
			'sellerProfiles'
		);

		cb(null, storagePath);
	},
	filename: function (req, file, cb) {
		cb(
			null,
			`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
		);
	},
});

const profileImageStorage = multer({ storage: storage }).single('profileImage');

module.exports = {
	profileImageStorage,
};
