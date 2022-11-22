const mongoose = require('mongoose')

const MCPSchema = new mongoose.Schema(
  {
    address: {
      type: String,
      required: [true, 'Please provide address'],
      unique:true
    },
    capacity: {
      type: Number,
      required: [true, 'Please provide position'],
      min: [1, 'The capacity is not valid']
    },
    status: {
      type: String,
      enum: ['empty', 'not-empty', 'full'],
      default: 'empty',
    },
    currentLoad: {
      type: Number,
      required: true,
      min: [0, 'Invalid input'],
      max: [this.capacity, 'Out of capacity'],
      default:0
    },
  },
  { timestamps: true }
)


module.exports = mongoose.model('MCP', MCPSchema)
