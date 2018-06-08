const express = require('express');
const router = express.Router();

const User = require('../models').User;
const user_controller = require('../controllers/userController');


/* GET users listing. */
router.get('/', user_controller.user_list);

/* GET create user. */
router.get('/create', user_controller.user_create_get);

/* POST create user. */
router.post('/create', user_controller.user_create_post);

/* GET delete user. */
router.get('/:id/delete', user_controller.user_delete_get);

/* POST delete user. */
router.post('/:id/delete', user_controller.user_delete_get);

/* GET update user. */
router.get('/:id/update', user_controller.user_update_get);

/* POST update user. */
router.post('/:id/update', user_controller.user_update_post);

/* GET user. */
router.get('/:id', user_controller.user_detail);

module.exports = router;
