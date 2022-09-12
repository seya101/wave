import db from '../config/database.js';

//get all users
export const getUsers = (result) => {
  db.query("SELECT * FROM users", (err, results) => {
    if(err) {
      console.log(err);
      result(err, null);
    } else {
      result (null, results);
      // console.log(results)
    }
  });
}

//get single user
export const getUserById = (id, result) => {
  db.query("SELECT * FROM users WHERE user_id = ?", [id], (err, results) => {
    if(err) {
      console.log(err);
      result(err, null);
    } else {
      result(null, results[0]);
    }
  });
}

//insert user
export const insertUser = (data, result) => {
  db.query("INSERT INTO  users SET ?", [data], (err, results) => {
    if(err) {
      console.log(err);
      result(err, null);
    } else {
      result (null, results);
    }
  });
}

//update user
export const updateUserById = (data, id, result) => {
  db.query("UPDATE users SET group_id = ?, role = ? WHERE user_id = ?", [data.group_id, data.role, id], (err, results) => {
    if(err) {
      console.log(err);
      result(err, null);
    } else {
      result(null, results);
    }
  });
}

//delete user
export const deleteUserById = (id, result) => {
  db.query("DELETE FROM users WHERE user_id = ?", [id], (err, results) => {
    if(err) {
      console.log(err);
      result(err, null);
    } else {
      result(null, results);
    }
  });
}
