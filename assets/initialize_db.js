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

const DEFAULT_EVENT_TYPES = [{
    name: 'Pits',
    description: 'Pits on the road',
    editable: 'false'
}, {
    name: 'Accidents',
    description: 'Car accidents',
    editable: 'false'
}, {
    name: 'Violence',
    description: 'Violence, crime, offence',
    editable: 'false'
}, {
    name: 'Dangers',
    description: 'Dangers, collapse, emergency condition',
    editable: 'false'
}, {
    name: 'Help',
    description: 'Help is needed',
    editable: 'false'
},  {
    name: 'Other',
    description: 'Need description',
    editable: 'false'
}];

const sqlite = require('sqlite3');
const models = require('../models');

const User = require('../models').User;
const EventType = require('../models').EventType;

// sync database
models
    .sequelize
    .sync()
    .then(() => {
        console.log('connected to db');

        createDefaultUsersIfNotExist();
    })
    .then(() => {

        createDefaultEventTypesIfNotExist();
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
        .catch(err => {
            console.log(err);
        });
}

function createDefaultEventTypesIfNotExist() {

    let defaultEventTypesBulkCreate = [];

    EventType
        .findAll()
        .then((alreadyInEventTypes) => {

            let alreadyIn = alreadyInEventTypes.map(eventType => eventType.name);

            DEFAULT_EVENT_TYPES.forEach(eventType => {

                if (!alreadyIn.includes(eventType.name)) {

                    defaultEventTypesBulkCreate.push({
                        name: eventType.name,
                        description: eventType.description,
                        editable: eventType.editable
                    });
                }
            });

            return defaultEventTypesBulkCreate;

        })
        .then(defaultEventTypesBulkCreate => {

            if(defaultEventTypesBulkCreate) {

                EventType
                    .bulkCreate(defaultEventTypesBulkCreate)
                    .then(() => {
                        return EventType.findAll();
                    })
                    .then((eventTypes) => {
                        console.log(eventTypes);
                    })
            }
        })
        .catch(err => {
            console.log(err);
        });

}