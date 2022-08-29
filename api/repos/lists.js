const connection = require('../utilities/db');

const lists = {
    add: (list, callback) => {
        let query = "INSERT INTO `lists` (`list_id`, `list_name`, `list_description`) VALUES (NULL, ? , ? )";
        connection.query(query, [list.name, list.description], (err, result) => {
            callback(err, result);
        });
    },
    getListById: (contactId, callback) => {
        let query = "SELECT * FROM `lists` WHERE `list_id`= ? "
        connection.query(query, [contactId], (err, result) => {
            callback(err, result);
        });
    },
    delete: (contactId, callback) => {
        let query = "DELETE FROM `lists` WHERE `list_id`= ? "
        connection.query(query, [contactId], (err, result) => {
            callback(err, result);
        });
    },
    removeFromList: (listId, contactId, callback) => {
        let query = "DELETE FROM `contacts_lists_tie` WHERE `list_id`= ? AND `contact_id`= ? ";
        connection.query(query, [listId, contactId], (err, result) => {
            callback(err, result);
        });
    },
    list: (callback) => {
        let query = "SELECT * FROM `lists` WHERE 1 ORDER BY list_id DESC";
        connection.query(query, (err, result) => {
            callback(err, result);
        });
    },
    listContacts: (listID, callback) => {
        let query = 'select * from (select * from `contacts_lists_tie` as base where `list_id`= ? ) as BASE left join `contacts` as CNT on CNT.`contact_id`=BASE.`contact_id`'
        console.log(query);
        connection.query(query, [listID], (err, result) => {
            console.log(err);
            callback(err, result);
        });
    },
    update: (record, callback) => {
        let query = "UPDATE `lists` SET `list_name` = ? ,`list_description`= ? WHERE `list_id` = ? ";
        console.log(query);
        connection.query(query, [record.name, record.description, record.id], (err, result) => {
            console.log(err);
            callback(err, result);
        });
    },
    addToList: (phone, listId, callback) => {
        let query = "SELECT * FROM `contacts` WHERE `phone` LIKE '%" + phone + "%'";
        console.log(query);
        connection.query(query, (er, rs) => {
            if (er || (rs[0] == undefined)) {
                console.log(rs);
                callback(er, rs);
            } else {
                if (rs[0].contact_id != undefined) {
                    console.log(rs[0]);
                    let query = "INSERT INTO `contacts_lists_tie` (`id`, `list_id`, `contact_id`) VALUES (NULL, ? , ? )";
                    connection.query(query, [listId, rs[0].contact_id], (err, result) => {
                        callback(err, result);
                    });
                }
            }
        });
    }
}
module.exports = lists;