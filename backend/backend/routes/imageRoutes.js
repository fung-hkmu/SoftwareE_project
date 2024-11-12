const express = require('express');
const verifyRole = require('../middleware/verify');
const whitelist = require('../middleware/whitelist');
const { upload } = require('../config/image');
const { uploadImg, image } = require('../controllers/imageController');

const router = express.Router();

router.post('/upload', whitelist, verifyRole('admin'), upload.single('image'), uploadImg);

router.get('/:filename', image);

module.exports = router;