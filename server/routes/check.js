const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.send({ success: true, message: 'Server is running' });
});

module.exports = router;