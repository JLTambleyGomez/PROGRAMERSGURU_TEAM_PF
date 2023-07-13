const admin = require('../config/firebase-config');
class Middleware {
	async decodeToken(req, res, next) {
		//no modifiquen nada aca
		console.log(req.headers);
		try {
			const token = req.headers.authorization.split(' ')[1] 
			const decodeValue = await admin.auth().verifyIdToken(token);
			if (decodeValue) {
				req.user = decodeValue;
				return next();
			}
			return res.json({ message: 'Unauthorized' });
		} catch (e) {
			return res.json({ message: 'Internal Error' + e.message });
		}
	}
}
module.exports = new Middleware();