const express = require('express')
const router = express.Router()

const {read, list, create, update, remove, search} = require('../Controllers/PosPromotion')


router.get('/pospromotion', list)
router.get('/pospromotion/:Id', read)
router.post('/pospromotion', create)
router.put('/pospromotion/:Id', update)
router.delete('/pospromotion/:Id', remove)

router.post('/pospromotion/search', search)

module.exports = router