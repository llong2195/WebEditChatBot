const mongoose = require('mongoose');
module.exports.connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI).then(() => {
            console.log(`MongoDB connected`);
        });
        return conn;
    } catch (error) {
        console.error(`Error: ${error}`);
        process.exit(1);
    }
}
