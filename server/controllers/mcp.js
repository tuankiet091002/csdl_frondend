const MCP = require('../models/MCP')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')

const getAllMCPs = async (req, res) => {
  let {status , numericFilters} = req.query
  const queryObject = {}
  if (status){
    queryObject.status = status
  }
  if (numericFilters) {
    queryObject.currentLoad = {}
    const operatorMap = {
      '>': '$gt',
      '>=': '$gte',
      '=': '$eq',
      '&lt;': '$lt',
      '&lt;=': '$lte',
      '<': '$lt',
      '<=': '$lte'
    };
    const regEx = /\b(<|>|>=|=|<|<=|&lt;=|&lt;)\b/g;
    let filters = numericFilters.replace(
      regEx,
      (match) => `-${operatorMap[match]}-`
    );
    filters = filters.split(',').forEach((item) => {
      const [field, operator, value] = item.split('-');
      if (field =='currentLoad') {
        const temp = { [operator]: Number(value) }
        queryObject.currentLoad = { ...queryObject.currentLoad , ...temp  }
      }
    });
  }

  const mcps = await MCP.find(queryObject).select('-__v -createdAt -updatedAt')
  res.status(StatusCodes.OK).json({ mcps, nbHits: mcps.length })
}
const getMCP = async (req, res) => {
  const {MCP_ID:id} = req.params
  const mcp = await MCP.findOne({_id:id})
  if (!mcp){
    throw new NotFoundError(`No MCP with id : ${id}`)
  }
  res.status(StatusCodes.OK).json({ mcp:mcp})
}

const createMCP = async (req, res) => {
  const {address , capacity} = req.body
  const mcp = await MCP.create({address , capacity})
  res.status(StatusCodes.CREATED).json( {msg:'MCP created', MCP: mcp} )
}

const updateMCP = async (req, res) => {
  const {MCP_ID:id} = req.params
  const mcp = await MCP.findOne({_id:id})
  if (!mcp){
    throw new NotFoundError(`No MCP with id : ${id}`)
  }
  let {currentLoad , status , capacity} = req.body
  if (capacity){
    throw new BadRequestError(`Updating capcity is not available`)
  }
  if (currentLoad == null){
    throw new BadRequestError('Please provide the current load of MCP')
  }
  if ( !( currentLoad >=0 && currentLoad <= mcp.capacity )){
    throw new BadRequestError(`Out of MCP's capacity`)
  }
  else if (currentLoad == 0 ){ status = 'empty' }
  else if (currentLoad == mcp.capacity){ status = 'full' }
  else { status = 'not-empty' }
  const updateMCP = await MCP.findOneAndUpdate({_id:id} , {currentLoad,status} , {new:true , runValidators:true})
  res.status(StatusCodes.OK).json({ msg:"Update successful!" , mcp:updateMCP })
}

const deleteMCP = async (req, res) => {
  const {MCP_ID:id} = req.params
  const mcp = await MCP.findOneAndRemove({_id:id})
  if (!mcp){
    throw new NotFoundError(`No MCP with id : ${id}`)
  }
  res.status(StatusCodes.OK).json({msg: 'Delete Successful', mcp: mcp })
}

module.exports = {
    getAllMCPs,
    createMCP,
    getMCP,
    deleteMCP,
    updateMCP,
}