const jwt = require('jsonwebtoken');

function authMiddleware(role) {
	return (req, res, next) => {
		const AuthorizationHeader = req.get('Authorization');
		const token = AuthorizationHeader
			? AuthorizationHeader.split(' ')[1]
			: null;

		if (!token) {
			return res
				.status(403)
				.json({ error: 'Access denied: invalid or expired token.' });
		}

		try {
			const isVerified = jwt.verify(token, process.env.SECRETE_STRING);
			const userRole = isVerified.role;

			if (role && userRole !== role) {
				return res.status(403).json({ error: 'Access denied: invalid role. ' });
			}
			next();
		} catch (error) {
			next(error);
		}
	};
}

module.exports = { authMiddleware };
