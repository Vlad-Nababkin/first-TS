const AuthController = require("../controllers/AuthController");
const verifyRefreshToken = require("../middleware/verifyRefreshToken");
const router = require("express").Router();

router.get('/refreshTokens', verifyRefreshToken, AuthController.refreshTokens)
router.post('/signUp', AuthController.signUp)
router.post('/signIn', AuthController.signIn)
router.get('/signOut', AuthController.signOut)

module.exports = router;
