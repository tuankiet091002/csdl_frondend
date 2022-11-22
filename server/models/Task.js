const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema(
  {
    employee: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide employee'],
    },
    assignedBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User'
    },
    workingRange: {         //area for janitor , route for collector
      type: [{type:mongoose.Types.ObjectId , ref:'MCP',required:true}],
      required:true,
      min:[1, `Please provide locations where employee's going to work`]
    },
    shift: {
      type: Number,
      required:true,
      enum: [1,2,3,4], // 1: 7h-9h , 2: 10h-12h , 3: 13h-15h , 4: 16h-18h
    },
    workLoad: {
      type: Number,
      required:true,
      min:1
    },
    date:{
      type:String,
      required:true
    },
    state:{
      type:String,
      enum:['completed','uncompleted'],
      default:'uncompleted',
      required:true
    },
    checkIn: {type: Date, default:null},
    checkOut: {type: Date, default:null},


  },
  { timestamps: true }
)

module.exports = mongoose.model('Task', TaskSchema)
