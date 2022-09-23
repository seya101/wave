import mysql from 'mysql2';

//create a connection to database
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  port: '3306',
  database: 'wave_db'
});

export default db;