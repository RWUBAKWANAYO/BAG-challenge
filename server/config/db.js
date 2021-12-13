const mongoose = require('mongoose');

const connectDB = () => {
	mongoose.connect(process.env.MONGO_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});
	mongoose.connection.on('connected', () => {
		console.log('connected to mongo db');
	});
	mongoose.connection.on('error', (error) => {
		console.log('connecting error', error);
	});
};

module.exports = connectDB;
