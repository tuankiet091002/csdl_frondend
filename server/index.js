import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

import empRoutes from './routes/emps.js'
import userRoutes from './routes/user.js'
const app = express();

app.use(bodyParser.json( { limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded( { limit: "30mb", extended: true}));
app.use(cors());

app.use('/emps', empRoutes);
app.use('/user/', userRoutes);

const CONNECTION_URL = 'mongodb+srv://kiet:091002@cluster.uuzcjk3.mongodb.net/?retryWrites=true&w=majority'
const PORT = process.env.PORT || 5000;
mongoose.connect(CONNECTION_URL)
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.log(error.message));