// auth.js
'use strict';
module.exports = {
    validateFunc: function (token, callback) {
        this.db.query('SELECT * FROM users WHERE token = ?', [token], (err, result) => {
            if (err) {
                return callback(err, false);
            }
            const user = result;
            if (!user) {
                return callback(null, false);
            }
            console.log(user);
            callback(null, true, {
                id: user.id,
                username: user.username
            });
        });
    }
};