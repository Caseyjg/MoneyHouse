var express = require('express');
var router = express.Router();
var path = require('path');
var mysql = require('mysql');

var connection = mysql.createConnection({
  host : 'mysql.cs.iastate.edu',
  user : 'dbu319team012',
  password : 'ZWM2YWRkNWNj',
  database: 'db319team012'
});

connection.connect();

router.get('/signUpPage', function(req, res, next) {
    res.sendFile(path.join(__dirname, '../', 'views', 'signUp.html'));
});

router.post('/signUp', function(req,res)
{
    var user = req.query.username;
    var pass = req.query.password;
    var win = 0;
    var loss = 0;
    values = [[user, pass, win, loss]];

    connection.query("insert into blackjack (login_name, pass, win, loss) values ?", [values], function(err, rows, fields) {
        if (!err) {
             connection.query("select user_id from blackjack where login_name = ?", user, function(err, rows, fields){
                if (!err){
                    console.log(rows);
                    res.json(rows);
                }
                else{
                    res.sendStatus(401);
                }
             });
        }
        else{
            console.log('Error while performing Query.', err);
            res.sendStatus(401);
        }
    });
});

router.get('/wins_req', function(req, res, next) {
    user_id = req.query.user_id;
    connection.query("select win, loss from blackjack where user_id = ?", user_id, function(err, rows, fields) {
        if (!err){
            res.json(rows);
        }
        else{
            console.log('Error while performing Query.', err);
            res.sendStatus(401);
        }
    });
});

router.post('/save_req', function(req, res, next) {
    user_id = req.query.user_id;
    win = parseInt(req.query.wins);
    loss = parseInt(req.query.loss);

    values = [[win, loss]];

    connection.query("update blackjack SET ? WHERE ?", [{win: win, loss: loss}, {user_id: user_id}], function(err, rows, fields) {
        if (!err){
            res.json(rows);
        }
        else{
            console.log('Error while performing Query.', err);
            res.sendStatus(401);
        }
    });
});

module.exports = router;
