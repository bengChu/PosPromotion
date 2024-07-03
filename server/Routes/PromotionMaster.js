const express = require('express')
const router = express.Router()

const {listPromotionMaster,createPromotionMaster} = require('../Controllers/PromotionMaster')

router.get('/promotionmaster', listPromotionMaster)
router.post('/promotionmaster',createPromotionMaster)

module.exports = router