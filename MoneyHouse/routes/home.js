var express = require('express');
var router = express.Router();
var path = require('path');
var mysql = require('mysql');

router.get('/casinoHomePage', function(req, res, next) {
    res.sendFile(path.join(__dirname, '../', 'views', 'blackjack.html'));
});

module.exports = router;