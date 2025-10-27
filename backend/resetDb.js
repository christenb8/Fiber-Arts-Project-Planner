const mongoose = require('mongoose');
const config = require('./config');

async function resetDatabase() {
    try {
        await mongoose.connect(config.mongoURI);
        await mongoose.connection.dropDatabase();
        console.log('Database reset successfully');
        process.exit(0);
    } catch (error) {
        console.error('Error resetting database:', error);
        process.exit(1);
    }
}

resetDatabase();