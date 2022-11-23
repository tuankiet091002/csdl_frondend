const Task = require('../models/Task')
const User = require('../models/User')
const moment = require('moment')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')


const getAllTasks = async (req, res) => {
  let {employee , shift , date , state , opposite} = req.query
  const queryObject = {}
  if (employee){
    employee = employee.split(',')
    queryObject.employee = employee
  }
  if (shift){
    shift = shift.split(',')
    queryObject.shift = shift
  }
  if (date){
    date = date.split(',')
    queryObject.date = date
  }
  if (state){
    state = state.split(',')
    queryObject.state = state
  }
  let tasks = await Task.find(queryObject).select('-__v -createdAt -updatedAt -checkIn -checkOut')
  if (opposite == 'true'){
    tasks = tasks.map(t =>{
      const {employee:i} = t
      return i
    })
    const users = await User.find( { _id: { $nin: tasks} ,  role: ['janitor' ,'backofficer'] } ).select('-__v -password -username ')
    res.status(StatusCodes.OK).json({ users, nbHits: users.length })
  }
  else{ res.status(StatusCodes.OK).json({ tasks, nbHits: tasks.length }) }
}

const getMyTasks = async (req, res) => {
  let { shift , date , state} = req.query
  const queryObject = {}
  if (shift){
    shift = shift.split(',')
    queryObject.shift = shift
  }
  if (date){
    date = date.split(',')
    queryObject.date = date
  }
  if (state){
    state = state.split(',')
    queryObject.state = state
  }
  queryObject.employee = req.user.userId
  let tasks = await Task.find(queryObject).select('-__v -createdAt -updatedAt -checkIn -checkOut')
  
  res.status(StatusCodes.OK).json({ tasks, nbHits: tasks.length })
}

const getTask = async (req, res) => {
  const {taskID:id} = req.params
  const task = await Task.findOne({_id:id})
  if (!task){
    throw new NotFoundError(`No task with id : ${id}`)
  }
  if ( req.user.userId != task.employee && req.user.role != 'admin' && req.user.role != 'backofficer' ){
    res.status(StatusCodes.FORBIDDEN).json({ msg: `You don't have permission to see this`})
  }
  res.status(StatusCodes.OK).json({ task:task})
}

const createTask = async (req, res) => {
  let { employee , workingRange , shift ,date , workLoad} = req.body
  if (!employee){
    throw new BadRequestError(`Please provide employee's ID`)
  }
  const emp = await User.findById(employee)
  
  if (!emp){
    throw new BadRequestError(`Employee is not valid`)
  }
  else if (emp.role == 'admin' ||emp.role == 'backofficer'){
    throw new BadRequestError(`You can't assign task to admin or backofficer`)
  }

  if (!workingRange ||!Array.isArray(workingRange)){throw new BadRequestError(`Please provide valid location(s)`)}

  const shifts = [1,2,3,4]
  if (!shift){ throw new BadRequestError(`Please provide shift`) }
  else if ( !shifts.includes(Number(shift)) ){throw new BadRequestError(`Please provide a valid shift`)}
  shift  = Number(shift)

  if (!date){throw new BadRequestError(`Please provide date`)}
  else if (!moment(date, 'YYYY-MM-DD', true).isValid()){ throw new BadRequestError(`Please provide a valid date`) }
  
  let date_param = moment(date ,'YYYY-MM-DD')
  if ( date_param.diff(moment(Date.now()), 'days' , true) < 0 ) {throw new BadRequestError(`You can not assign a task in the past`)}
  
  if ( emp.role == 'janitor' && workingRange.length > 1){
    throw new BadRequestError(`Janitor can only work 1 shift / 1 MCP`)
  }
  const existTask = await Task.findOne({employee:employee , shift:shift , date:date })
  if (existTask){
    throw new BadRequestError(`This employee already has a task in this shift`)
  }
  
  if (workLoad > emp.currentVehicle){
    throw new BadRequestError(`This employee's vehicle can not carry enough ${workLoad} kg trash`)
  }
  const result = await Task.create({employee:employee , workingRange:workingRange,shift:shift , assignedBy: req.user.userId ,workLoad:workLoad ,date:date })
  res.status(StatusCodes.OK).json({msg:"Task was created!" , task: result})
}

const updateTask = async (req, res) => {
  const {taskID:id} = req.params
  const task = await Task.findOne({_id:id})
  if (!task){
    throw new NotFoundError(`No Task with id : ${id}`)
  }
  const deadlineTask = task.date + ` ${3*task.shift + 6}`
  const momentDeadline = moment(deadlineTask , 'YYYY-MM-DD h')
  const {workLoad , checkIn , checkOut } = req.body
  const queryObject = {}
  if (workLoad!= null){
    if (req.user.role!='admin' && req.user.role!='backofficer'){
      throw new BadRequestError(`You don't have perrmission to change workload`)
    }
    queryObject.workLoad = workLoad
  }
  if(checkIn){
    if (req.user.userId != task.employee){throw new BadRequestError(`You are not the worker of this task`)}
    const tmp = momentDeadline.diff(Date.now() , 'hours' ,true)
    if( !(tmp>=0 && tmp <= 2) ){
      throw new BadRequestError(`Out of checkin time`)
    }
    if (task.checkIn != null){ throw new BadRequestError(`You already checkin this task`) }
    queryObject.checkIn = Date.now()
  }
  if(checkOut){
    if (req.user.userId != task.employee){throw new BadRequestError(`You are not the worker of this task`)}
    const tmp = momentDeadline.diff(Date.now() , 'hours' ,true)
    if( !(tmp>=0 && tmp <= 2) ){
      throw new BadRequestError(`Out of checkout time`)
    }
    if (task.checkIn == null){ throw new BadRequestError(`Please checkin this task first`) }
    queryObject.checkOut= Date.now()
    queryObject.state = 'completed'
  }
  const result = await Task.findOneAndUpdate({_id:id} ,queryObject , {new:true , runValidators:true} )
  res.status(StatusCodes.OK).json({msg:'Updated successful' , task:result})
}

const deleteTask = async (req, res) => {
  const {taskID:id} = req.params
  const task = await Task.findOneAndRemove({_id:id})
  if (!task){
    throw new NotFoundError(`No Task with id : ${id}`)
  }
  res.status(StatusCodes.OK).json({msg: 'Delete Successful', task:task })
}

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  deleteTask,
  updateTask,
  getMyTasks
}