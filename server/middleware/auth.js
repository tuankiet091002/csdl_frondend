import jwt from "jsonwebtoken";

const secret = 'kietdeptrai';

const auth = async (req, res, next) => {
	try {
		if(req.headers.authorization) {
			const token = req.headers.authorization.split(" ")[1];
			const isManualAuth = token.length < 500;

			let decodedData;

			if (isManualAuth) {      
				decodedData = jwt.verify(token, secret);
				req.userId = decodedData?.id;
				res.isAdmin = false;
			} else {
				decodedData = jwt.decode(token);
				req.userId = decodedData?.sub;
				res.isAdmin = true;
			}
		}    
		next();
	} catch (error) {
		console.log(error);
	}
};

export default auth;