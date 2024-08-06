const express = require('express');
const { signup, login } = require('../controllers/Auth');
const { auth } = require('../middleware/auth');
const { getUser } = require("../controllers/User");
const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/getUser', auth, getUser);

module.exports = router;