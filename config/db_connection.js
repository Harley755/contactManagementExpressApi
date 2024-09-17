const mysql = require('mysql2/promise');

const connectionDb = async () => {
    try {
        const connection = await mysql.createConnection({
            host: process.env.HOST,
            user: process.env.USERNAME,
            password: process.env.PASSWORD,
            database: process.env.DATABASENAME
        });
        
        return connection;
    } catch (error) {
        console.log('Failed to connect to mysql database because ', error);
        process.exit(1);
    }
};



module.exports = connectionDb;
