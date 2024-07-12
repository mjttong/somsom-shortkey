const express = require('express');
const router = express.Router();
const { hardUrl } = require('../controller/hard-controller');

router.post('/hard-url-create', hardUrl);

module.exports = router;