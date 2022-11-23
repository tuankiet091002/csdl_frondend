const bcrypt = require('bcryptjs')
const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')

const getUsers  = async (req, res) => {
  const { name , role } = req.query
  const queryObject = {}
  if (role) {
    queryObject.role = role
  }
  if (name) {
    queryObject.name = {$regex: name, $options: 'i'}
  }
  const users = await User.find(queryObject).select('-password -username -__v')
  res.status(200).json({ users, nbHits: users.length })

}
const getSingleUser = async (req, res) => {
  const {userID:id} = req.params
  const user = await User.findOne({_id:id}).select('-password -username -__v')
  if (!user) {
    throw new NotFoundError(`No user with id : ${id}`);
  }
  res.status(StatusCodes.OK).json({user})
}

const showCurrentUser = async (req, res) => {
  res.status(StatusCodes.OK).json({ user: req.user });
};

const updateUserInfo = async (req, res) => {
  const {userID:id} = req.params
  const {username , password ,role , currentVehicle} = req.body

  if (username && req.user.role != 'admin' ){
    throw new BadRequestError(`You don't have permission to change the username`)
  }
  if (role && req.user.role != 'admin'){
    throw new BadRequestError(`You don't have permission to change the role`)
  }
  if (currentVehicle && req.user.role != 'admin' && req.user.role != 'backofficer'){
    throw new BadRequestError(`You don't have permission to change user's vehicle`)
  }
  if (password){
    if (req.user.role != 'admin' && req.user._id != id ){
      throw new BadRequestError(`You don't have permission to change this account's password`)
    }
    const salt = await bcrypt.genSalt(10)
    req.body.password = await bcrypt.hash(req.body.password, salt)
  }
  const user = await User.findOneAndUpdate({_id:id},req.body, {new: true, runValidators: true} )
  if (!user) {
    throw new NotFoundError(`No user with id : ${id}`);
  }
  res.status(StatusCodes.OK).json({user})
}

module.exports = {
  getUsers,
  getSingleUser,
  updateUserInfo,
  showCurrentUser
}