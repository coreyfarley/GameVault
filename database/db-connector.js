// Get an instance of mysql we can use in the app
let mysql = require('mysql2')

const credentials = require('./db-credentials');

// Create a 'connection pool' using the provided credentials
const pool = mysql.createPool({
    waitForConnections: true,
    connectionLimit   : 10,
    host              : credentials.host,
    user              : credentials.user,
    password          : credentials.password,
    database          : credentials.database
}).promise(); // This makes it so we can use async / await rather than callbacks

// Export it for use in our application
module.exports = pool;
