require('dotenv').config();
require('express-async-errors');

const path = require('path');
const cookieParser = require('cookie-parser');
// extra security packages
const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');


//express
const express = require('express');
const app = express();

// Swagger
const swaggerUI = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');

//connect to database
const connectDB = require('./database/connect');

const authenticateUser = require('./middlewares/authentication');

// routers
const auth = require('./routes/auth');
const tasks = require('./routes/tasks');
const mcp = require('./routes/mcp');
const user = require('./routes/user');

// error handler
const notFoundMiddleware = require('./middlewares/not-found');
const errorHandlerMiddleware = require('./middlewares/error-handler');

//
//cookie and json body parsers
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));
//Extra security apply
app.use(helmet());
app.use(cors());
app.use(xss());



app.get('/', (req, res) => {
  res.send('<h1>UWC2.0</h1><a href="/api-docs">API Documentation</a>');
});
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
//routes
app.use('/api/v1/auth', auth);
app.use('/api/v1/user', authenticateUser ,user);
app.use('/api/v1/mcp',authenticateUser ,mcp);
app.use('/api/v1/tasks',authenticateUser , tasks); //authenticateUser middleware
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log('Connected to database');
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();