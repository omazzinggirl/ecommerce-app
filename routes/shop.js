const path = require('path')

const express = require('express')

const roothDir = require('../util/path')

const router = express.Router()

router.get('/', (req, res, next) => {
    res.sendFile(path.join(roothDir, 'views', 'shop.html'))
})

module.exports = router