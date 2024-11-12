const express = require('express');
const { userData } = require('../controllers/acctController');
const verifyRole = require('../middleware/verify');

const router = express.Router();

router.post('/userData', verifyRole('user'), userData);

module.exports = router;