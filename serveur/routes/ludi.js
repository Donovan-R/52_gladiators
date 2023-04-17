const express = require('express');
const router = express.Router();

const { createLudus, getAllLudi } = require('../controllers/ludi.js');

router.route('/').get(getAllLudi).post(createLudus);
// router.route('/:id').put(updateLudus);

module.exports = router;
