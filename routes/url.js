const express = require('express');
const router = express.Router();
const {inputUrl, createShortUrl} = require('../controller/url-controller');

router.post('/input-url', inputUrl);
router.post('/create-short-url', createShortUrl);

module.exports = router;