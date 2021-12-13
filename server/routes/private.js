const express = require('express');
const router = express.Router();
const { GetUserProfile } = require('../controllers/GetUserProfile');
const { AddUserList } = require('../controllers/AdduserList');
const { GetUserList } = require('../controllers/GetUserList');
const { DeleteUserList } = require('../controllers/DeleteUserList');
const { protect } = require('../middleware/auth');

router.route('/profile').get(protect, GetUserProfile);
router.route('/createlist').post(protect, AddUserList);
router.route('/getlist').get(protect, GetUserList);
router.route('/deletelist').delete(protect, DeleteUserList);

module.exports = router;
