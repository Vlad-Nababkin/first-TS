const NumController = require('../controllers/NumController')
const verifyAccessToken = require('../middleware/verifyAccessToken')

const router = require('express').Router()

router.get('/', NumController.getAllNums)
router.get('/:id', verifyAccessToken, NumController.getNumsById)
router.post('/', verifyAccessToken, NumController.createNum)
router.put('/:id', verifyAccessToken, NumController.updateNum)
router.delete('/:id', verifyAccessToken, NumController.deleteNum)

module.exports = router
