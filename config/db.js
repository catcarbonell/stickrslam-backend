const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');
console.log(process.env);

const connectDB = async () => {
    try {
        await mongoose.connect(db, {
            useNewUrlParser : true,
            useUnifiedTopology: true
        });
        console.log('MongoDB connected...')
    } catch(err) {
        console.error(err.message);
        process.exit(1);
    }
}

module.exports = connectDB;