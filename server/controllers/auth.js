const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, UnauthenticatedError } = require('../errors/index')
const { attachCookiesToResponse, createPayloadToken } = require('../utils')


const register = async (req, res) => {
	const { name, username, password , role } = req.body;
	// first registered user is an admin
	try {
		const oldUser = await User.findOne({ username });
		if (oldUser) {
			throw new BadRequestError('User already exists');
		}
		const user = await User.create({ name, username, password, role });
		const tokenUser = createPayloadToken(user);
		attachCookiesToResponse({ res, user: tokenUser });
		res.status(StatusCodes.CREATED).json({ user: tokenUser });
	} catch (error) {
		throw new BadRequestError('Something went wrong when register, pleasse try again!')	
	}
}

const login = async (req, res) => {
	const { username, password } = req.body;
	try {
		if (!username || !password) {
			throw new BadRequestError('Please provide username and password');
		}
		const user = await User.findOne({ username });

		if (!user) {
			throw new UnauthenticatedError('User is not exist');
		}
		const isPasswordCorrect = await user.comparePassword(password);
		if (!isPasswordCorrect) {
			throw new UnauthenticatedError('Wrong password');
		}
		const tokenUser = createPayloadToken(user);
		attachCookiesToResponse({ res, user: tokenUser });
		res.status(StatusCodes.OK).json({ user: tokenUser });
	} catch (error) {
		throw new BadRequestError('Something went wrong when login, pleasse try again!')
	}
};

const logout = async (req, res) => {
	res.cookie('token', 'logout', {
		httpOnly: true,
		expires: new Date(Date.now() + 1000),
	});
	res.status(StatusCodes.OK).json({ msg: 'User logged out!' });
};

module.exports = {register, login, logout};
