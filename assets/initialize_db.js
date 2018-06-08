const DEFAULT_USERS = [{
    username: 'admin',
    password: 'welcome',
    permission: 'execute',
    editable: 'false',
    email: 'admin@sps.org'
}, {
    username: 'superuser',
    password: 'welcome',
    permission: 'write',
    editable: 'false',
    email: 'superuser@sps.org'
}, {
    username: 'user',
    password: 'welcome',
    permission: 'read',
    editable: 'false',
    email: 'user@sps.org'
}];


const sqlite = require('sqlite3');
const models = require('../models');

const User = require('../models').User;

// sync database
models
    .sequelize
    .sync()
    .then(function() {
        console.log('connected to db');

        let defaultUsersBulkCreate = [];

        DEFAULT_USERS.forEach(defaultUser => {

            defaultUsersBulkCreate.push({
                username: defaultUser.username,
                password: defaultUser.password,
                permission: defaultUser.permission,
                editable: defaultUser.editable,
                email: defaultUser.email
            })
/*
            User
                .findOrCreate({where: {username: defaultUser.username}, defaults: {
                        password: defaultUser.password,
                        permission: defaultUser.permission,
                        editable: defaultUser.editable,
                        email: defaultUser.email
                }})
                .spread((createdUser, created) => {
                    if (createdUser) {
                        console.log(createdUser);
                    }
                })
                .catch(err => {
                    console.log(err.message);
                })
                */
        });

        User
            .bulkCreate(defaultUsersBulkCreate)
            .then(() => {
                return User.findAll();
            })
            .then((users) => {
                console.log(users);
            })
    })
    .catch(function(err) {
        console.log(err)
    });