var models = require('../models');
var Promise = require('bluebird');
var modelsGet = Promise.promisify(models.messages.get);
var messagesP = Promise.promisifyAll(models.messages);
var usersP = Promise.promisifyAll(models.users);
// controllers, requires models

// interacts w/ the server

module.exports = {
  messages: {
    get: function (req, res) {
      models.messages.get(req, function(data) {
        // console.log('data in messages get request');
        // console.log(data);
        exports.sendResponse(res, data, 200);
      });
    }, // a function which handles a get request for all messages

    // get: function (req, res) {
    //   messagesP.get(req).then(function(data) {
    //     // console.log('data in messages get request');
    //     // console.log(data);
    //     exports.sendResponse(res, data, 200);
    //   });
    // },


    post: function (req, res) {
      // console.log('post message controller')
      models.messages.post(req.body, function(data) {
        exports.sendResponse(res, data, 200);
      });
    } // a function which handles posting a message to the database

    // post: function (req, res) {
    //   // console.log('post message controller')
    //   messagesP.post(req.body).then(function(data) {
    //     exports.sendResponse(res, data, 200);
    //   });
    // } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {

    },
    post: function (req, res) {
      // post to database -
      var user = req.body;  // { username: 'Valjean' }
      models.users.post(user, function(data) {
        exports.sendResponse(res, data, 200);
      });
    }
  }
};

var headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "application/json"
};

exports.sendResponse = function(response, data, statusCode){
  statusCode = statusCode || 200;
  response.writeHead(statusCode, headers);
  response.end(JSON.stringify(data));
};
