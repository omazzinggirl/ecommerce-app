const express = require('express')

const router = express.Router()
const authController = require('../controllers/auth')


router.get('/login', authController.getLogin);

router.get('/signup', authController.getSignup);

router.post('/login', authController.postLogin);

router.post('/signup', authController.postSignup);

router.post('/logout', authController.postLogout);
module.exports = router;