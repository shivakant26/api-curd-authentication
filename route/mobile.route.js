const router  = require("express").Router();
const mobileController = require("../controller/mobile.controller");
const authenticateToken = require("../middleware/authMiddleware");
const upload = require('../middleware/imageUpload');
router.post("/mobile",upload.single('image'), authenticateToken ,mobileController.createMobile)
router.get("/mobile",mobileController.getAllMobile)
router.get("/mobile/:id",mobileController.singleMobile)
router.put("/mobile/:id",authenticateToken,mobileController.updateMobile)
router.delete("/mobile/:id",authenticateToken,mobileController.deleteMobile)


module.exports = router;