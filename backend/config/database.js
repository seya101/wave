import mysql from 'mysql2';

//create a connection to database
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  port: '8111',
  database: 'wave_db'
});

export default db;