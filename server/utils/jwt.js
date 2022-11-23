const { NO_CONTENT } = require('http-status-codes');
const jwt = require('jsonwebtoken');
const { NotFoundError } = require('../errors');

const createJWT = ({ payload }) => {
	const token = jwt.sign(payload, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_LIFETIME,
	});
	return token;
};

const isTokenValid = ({ token }) => jwt.verify(token, process.env.JWT_SECRET);

const attachCookiesToResponse = ({ res, user }) => {
	const token = createJWT({ payload: user });

	const oneDay = 1000 * 60 * 60 * 24;
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
	
	res.cookie('token', token, {
		expires: new Date(Date.now() + oneDay),
		signed: true,
		sameSite: "None", 
      	secure: true,      
      	httpOnly: false
	});
};

module.exports = {
    createJWT,
    isTokenValid,
    attachCookiesToResponse,
};
