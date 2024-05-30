const express = require('express')
const router = express.Router()
const sheepController = require('../controllers/sheepControllers.js')

router.route('/')
    .get(sheepController.getAllSheep)
    .post(sheepController.createNewSheep)

router.route('/onesheep/:id')
    .get(sheepController.getOneSheep)

module.exports = router