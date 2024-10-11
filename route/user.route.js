const router  = require("express").Router();
const userController = require("../controller/user.controller");
router.post("/auth",userController.createUser)
router.post("/auth/login",userController.loginUser)
router.post('/reset-password/:resetToken', userController.resetPassword);
router.post('/request-password-reset', userController.requestPasswordReset);
router.post('/logout', userController.logoutUser);

module.exports = router;