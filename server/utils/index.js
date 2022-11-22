const { createJWT, isTokenValid, attachCookiesToResponse } = require('./jwt');
const createPayloadToken = require('./createPayloadToken');
module.exports = {
  createJWT,
  isTokenValid,
  attachCookiesToResponse,
  createPayloadToken
};
