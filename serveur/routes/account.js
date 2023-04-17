const express = require('express');
const router = express.Router();

const { getLanisteInfos } = require('../controllers/account.js');

router.route('/').get(getLanisteInfos);

module.exports = router;
