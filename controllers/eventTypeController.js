const EventType = require('../models').EventType;

exports.event_type_list = function (req, res) {

    EventType
        .findAll({
            order: [['id', 'ASC']]
        })
        .then(event_types => {
            res.render('event_types', { title: 'Event Types', event_type_list: event_types})
        })
        .catch(err => {
            showError(res, err);
        });

};

function showError(res, error, message='Error', status='', stack='') {

    if (error) {
        res.render('error', {
            message: error.message || message,
            error: {
                status: error.status || status,
                stack: error.stack || stack
            }
        })
    } else {
        res.render('error', {
            message: message,
            error: {
                status: status,
                stack: stack
            }
        })
    }

}