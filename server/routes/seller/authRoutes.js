const express = require('express');
const router = express.Router();

const { authMiddleware } = require('../../middlewares/auth/authMiddleware');

router.post('/seller-auth', authMiddleware('seller'));
router.post('/customer-auth', authMiddleware('customer'));

module.exports = router;
