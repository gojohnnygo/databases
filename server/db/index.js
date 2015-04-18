var mysql = require('mysql');
// database

// Create a database connection and export it from this file.
exports.dbConnection = mysql.createConnection({
  user: 'root',
  database: 'chat'
});

exports.dbConnection.connect();

// You will need to connect with the user "root", no password,
// and to the database "chat".


