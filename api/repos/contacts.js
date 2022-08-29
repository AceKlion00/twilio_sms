const connection = require('../utilities/db');

const contacts = {
    add: (contact, callback) => {
        let query = "INSERT INTO `contacts` (`contact_id`, `first_name`, `middle_name`, `last_name`,`phone`,`email`,`description`) VALUES (NULL, ? , ? , ? , ? , ? , ? )";
        connection.query(query, [contact.firstName, contact.middleName, contact.lastName, contact.phone, contact.email, contact.description], (err, result) => {
            callback(err, result);
        });
    },
    getContactById: (contactId, callback) => {
        let query = "SELECT * FROM `contacts` WHERE `contact_id`= ? "
        connection.query(query, [contactId], (err, result) => {
            callback(err, result);
        });
    },
    getContactById: (term, callback) => {
        let query = "SELECT * FROM `contacts` WHERE `first_name` LIKE '%" + term + "%' OR `last_name` LIKE '%" + term + "%'";
        connection.query(query, (err, result) => {
            callback(err, result);
        });
    },
    delete: (contactId, callback) => {
        let query = "DELETE FROM `contacts` WHERE `contact_id`= ? "
        connection.query(query, [contactId], (err, result) => {
            callback(err, result);
        });
    },
    list: (callback) => {
        let query = "SELECT * FROM `contacts` WHERE 1 ORDER BY contact_id DESC";
        connection.query(query, (err, result) => {
            callback(err, result);
        });
    },
    update: (contact, callback) => {
        let query = "UPDATE `contacts` SET `first_name` = ? , `middle_name` = ? , `last_name`= ? , `email` = ? , `phone`= ? , `description` = ?  WHERE `contact_id` =  ? ";
        console.log(query);
        connection.query(query, [contact.firstName, contact.middleName, contact.lastName, contact.email, contact.phone, contact.description, contact.id], (err, result) => {
            callback(err, result);
        });
    }
}
module.exports = contacts;