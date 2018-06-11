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
    .then(() => {
        console.log('connected to db');

        createDefaultUsersIfNotExist();

    })
    .catch(function(err) {
        console.log(err)
    });

function createDefaultUsersIfNotExist() {

    let defaultUsersBulkCreate = [];

    User
        .findAll()
        .then(alreadyInUsers => {

            let alreadyIn = alreadyInUsers.map(user => user.username);

            DEFAULT_USERS.forEach(user => {

                if (!alreadyIn.includes(user.username)) {

                    defaultUsersBulkCreate.push({
                        username: user.username,
                        password: user.password,
                        permission: user.permission,
                        editable: user.editable,
                        email: user.email
                    })
                }
            });

            return defaultUsersBulkCreate
        })
        .then(defaultUsersBulkCreate => {

            if(defaultUsersBulkCreate) {
                User
                    .bulkCreate(defaultUsersBulkCreate)
                    .then(() => {
                        return User.findAll();
                    })
                    .then((users) => {
                        console.log(users);
                    })
            }

        })
        .catch(function(err) {
            console.log(err);
        });
}