const { type } = require('server/reply');

const sellerSignupSchema = new mongoose.Schema({
	companies: {
		xyz: {
			name: String,
			bill: Number,
			date: Date(),
		},
		xyz1: {
			name: String,
			bill: Number,
			date: Date(),
		},
		xyz2: {
			name: String,
			bill: Number,
			date: Date(),
		},
	},
});
