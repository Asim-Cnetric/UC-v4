const express = require('express');
const UserController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const validate = require("../middleware/validate");
const {registrationSchema, loginSchema} = require("../validations/user");

const router = express.Router();

router.post('/register', validate(registrationSchema), UserController.registerUser);
router.post('/login', validate(loginSchema), UserController.userLogin);
router.get('/me', authMiddleware, UserController.getUserDetails)
router.put('/update', authMiddleware, UserController.updateUser)
router.delete('/delete', authMiddleware, UserController.deleteUser)

module.exports = router;
