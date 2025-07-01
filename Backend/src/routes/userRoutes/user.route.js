const express = require('express');
const router = express.Router();
const userController = require('../../controllers/userControllers/user.controller.js');
const authMiddleware = require('../../middlewares/authMiddleware.js');

router.post('/register',userController.registerController);
router.post('/login',userController.loginController);
router.post('/logout',userController.logoutController);
router.patch('/update',userController.updateController);
router.patch('/update-feedback',userController.updateFeedbackController);
router.delete('/delete',userController.deleteController);
router.get('/current-user',authMiddleware,userController.currentUserController);

module.exports = router;

