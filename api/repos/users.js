const connection = require('../utilities/db');

const users = {
    add: (user, callback) => {
        let query = "INSERT INTO `users` (`user_id`, `user_fullname`, `user_email`, `user_password`,`user_roles`,`user_status`) VALUES (NULL, ? , ? , ? , ? , 1 )";
        connection.query(query, [user.fullname, user.email, user.password, user.role], (err, result) => {
            callback(err, result);
        });
    },
    checkUserExist: (email, callback) => {
        let query = "SELECT * FROM `users` WHERE `user_email`= ? "
        connection.query(query, [email], (err, result) => {
            callback(err, result);
        });
    },
    getUsersById: (userId, callback) => {
        let query = "SELECT * FROM `users` WHERE `user_id`= ? "
        connection.query(query, [accountId], (err, result) => {
            callback(err, result);
        });
    },
    list: (callback) => {
        let query = "SELECT * FROM `users` WHERE `user_status` <> 0 ORDER BY user_id DESC";
        connection.query(query, (err, result) => {
            callback(err, result);
        });
    },
    updateField: (userId, key, value, callback) => {
        let query = "UPDATE `users` SET `" + key + "` = '" + value + "' WHERE `user_id` = " + userId;
        console.log(query);
        connection.query(query, (err, result) => {
            callback(err, result);
        });
    }
}
module.exports = users;