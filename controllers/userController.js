const User = require('../models').User;
const permissions = User.rawAttributes.permission.values;

const {body, validationResult} = require('express-validator/check');
const {sanitizeBody} = require('express-validator/filter');

const _ = require('lodash');

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

    const _id = _.toNumber(req.params.id);

    if(_.isNumber(_id) && !_.isNaN(_id)) {

        User
            .findById(_id)
            .then(user => {

                if (user) {
                    res.render('user_form', { title: 'Edit User', permission_list: permissions, user: user})
                } else {
                    res.render('error', {
                        message: `No user`,
                        error: { status: '', stack: `There is no user with id: ${_id}`}})
                }
            })
            .catch(err => {
                res.render('error', { message: err.message, error: { status: err.status, stack: err.stack}})
            });


    } else {
        res.render('error', { message: 'Incorrect User Id.', error: { status: '', stack: `User Id: ${_id}`}})
    }
};

exports.user_update_post = [

    checkIdInput,
    checkIdExist,

    body('username', 'Username is required').isLength({ min: 1 }).trim(),
    body('password', 'Password mast have at least 8 characters').isLength({ min: 8 }).trim(),
    body('confirmPassword', 'Confirm Password mast have at least 8 characters').isLength({ min: 8}).trim(),
    body('permission', 'Permission is required').isLength({ min: 1}).trim(),
    body('email', 'Email is required').isLength({ min: 1 }).trim(),

    sanitizeBody('username').trim().escape(),
    sanitizeBody('password').trim().escape(),
    sanitizeBody('confirmPassword').trim().escape(),
    sanitizeBody('permission').trim().escape(),
    sanitizeBody('email').trim().escape(),

    (req, res, next) => {

        const errors = validationResult(req);

        const _id = _.toNumber(req.params.id);

        let user = new User({
            id: _id,
            username: req.body.username,
            password: req.body.password,
            confirmPassword: req.body.confirmPassword,
            permission: req.body.permission,
            email: req.body.email
        });

        if (!errors.isEmpty()) {
            res.render('user_form', { title: 'Edit User', permission_list: permissions, user: user, errors: errors.array()});
        } else {
            User
                .update({
                    username: req.body.username,
                    password: req.body.password,
                    permission: req.body.permission,
                    email: req.body.email
                }, {
                    where: { id: _id }
                })
                .then(count => {

                    User
                        .findAll()
                        .then(users => {
                            res.render('users', { title: 'Users', user_list: users, updated_user: user});
                        })
                        .catch(err => {

                            showError(res, err);
                        });
                })
                .catch(err => {

                    showError(res, err);
                })
        }
    }
];

function showError(res, error, message='Error', status='', stack='') {

    res.render('error', {
        message: error.message || message,
        error: {
            status: error.status || status,
            stack: error.stack || stack
        }
    })
}
