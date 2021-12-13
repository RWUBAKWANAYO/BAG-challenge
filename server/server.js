require('dotenv').config({ path: './config.env' });
const express = require('express');
const cors = require('cors')
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error')

//connect DB
connectDB();
const app = express();
app.use(cors())
app.use(express.json());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/private', require('./routes/private'));

//error handle should be last piece of middleware

app.use(errorHandler)

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () =>
	console.log(`server is running on PORT ${PORT}`)
);

process.on('unhandledRejection', (error, promise) => {
	console.log(error);
	server.close(() => process.exit(1));
});
