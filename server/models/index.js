var db = require('../db').dbConnection;
// models, requires db

// Define schema?
// message = {
//
// }

module.exports = {
  messages: {
    get: function (req, cb) {
      db.query('SELECT * FROM messages', function(err, result) {
        err && console.log(err);
        cb(result);
      });
    }, // a function which produces all the messages
    post: function (message, cb) {
      // console.log('post message model');
      // get user id
      module.exports.users.get(message, function(userId) {
        var entry = {
          user_id: userId,
          message: message.message,
          roomname: message.roomname
        };

        // json: {
        //   username: "Valjean",
        //   message: "In mercy's name, three days is all I need.",
        //   roomname: "Hello"
        // }

        db.query('INSERT INTO messages SET ?', entry, function(err, result) {
          if (err) {
            // console.log(err);
          } else {
            console.log('post message');
            console.log(result);
            cb(result.insertId);
          }
        });
      });

    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function (message, cb) {
      var username = message.username;
      db.query('SELECT * FROM users WHERE username=?', username, function(err, result) {
        if (err) {
          // console.log(err);
        } else {
          // console.log('get user id', result[0].id);
          cb(result[0].id);
        }
      });


    },
    post: function (user, cb) {
      var username = user.username;
      db.query('INSERT INTO users SET username=?', username, function(err, result) {
        if (err) {
          // cb(err);
          db.query('SELECT * FROM users where username=?', username, function(err, result) {
            cb(result);
            // console.log('post (no duplicate)', result[0].id); // primary key value
          });
          // console.log(err);
        } else {
          cb(result);
          // console.log('post unique', result.insertId); // primary key value
        }
      });
    }
  }
};

