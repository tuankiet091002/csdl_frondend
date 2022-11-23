const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, UnauthenticatedError } = require('../errors/index')
const { attachCookiesToResponse, createPayloadToken } = require('../utils')

const register = async (req, res) => {
	const { name, username, password ,role} = req.body;
	const usernameAlreadyExists = await User.findOne({ username });
	if (usernameAlreadyExists) {
		throw new BadRequestError('Username already exists');
	}
	// first registered user is an admin
	try {
		const user = await User.create({ name, username, password, role });
		const tokenUser = createPayloadToken(user);
		attachCookiesToResponse({ res, user: tokenUser });
		res.status(StatusCodes.CREATED).json({ user: tokenUser });
		
	} catch (error) {
		throw error
	}
}

const login = async (req, res) => {
	const { username, password } = req.body;

	if (!username || !password) {
		throw new BadRequestError('Please provide username and password');
	}
	const user = await User.findOne({ username });

	if (!user) {
		throw new UnauthenticatedError('Invalid Credentials');
	}
	const isPasswordCorrect = await user.comparePassword(password);
	if (!isPasswordCorrect) {
		throw new UnauthenticatedError('Invalid Credentials');
	}
	const tokenUser = createPayloadToken(user);
	attachCookiesToResponse({ res, user: tokenUser });

	res.status(StatusCodes.OK).json({ user: tokenUser });
};

const logout = async (req, res) => {
	res.cookie('token', 'logout', {
		expires: new Date(Date.now() + 1000),
		sameSite: "None", 
      	secure: true,      
      	httpOnly: false
	});
	res.status(StatusCodes.OK).json({ msg: 'User logged out!' });
};

module.exports = {
  register,
  login,
  logout,
};
