const express = require('express')
const router = express.Router()

const {list, create } = require('../Controllers/DocumentStatus')

router.get('/documentstatus', list)
router.post('/documentstatus', create)

module.exports = router