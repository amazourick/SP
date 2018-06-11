const User = require('../models').User;
const permissions = User.rawAttributes.permission.values;

const {body, validationResult} = require('express-validator/check');
const {sanitizeBody} = require('express-validator/filter');

//middleware
const checkIdInput = function (req, res, next) {
    if (isNaN(req.params.id)) {
        res.status(400).json('Invalid user id supplied');
    } else {
        next();
    }
};

const checkIdExist = function (req, res, next) {
    User
        .count({
            where: {
                id: req.params.id
            }
        })
        .then(count => {
            if (count !== 0) {
                next();
            } else {
                res.status(400).json('User is not found');
            }
        })
};

exports.user_list = function(req, res) {

    User
        .findAll()
        .then(users => {
            res.render('users', { title: 'Users', user_list: users});
        })
        .catch(err => {
            console.log(err);
        });
};

exports.user_detail = function(req, res) {
    res.send('NOT IMPLEMENTED: User detail: ' + req.params.id);
};

exports.user_create_get = function(req, res) {
    res.render('user_form', { title: 'Create User', permission_list: permissions});
};

exports.user_create_post = function(req, res) {
    res.send('NOT IMPLEMENTED: User create POST');
};

exports.user_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: User delete GET');
};

exports.user_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: User delete POST');
};

exports.user_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: User update GET');
};

exports.user_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: User update POST');
};