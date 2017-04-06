const router = require('express').Router();
const controller = require('./treasure.controller.js');
const upload = require('multer')();

// 藏宝
router.get('/getactivities', controller.getTreasureActivities);
router.get('/signupact', controller.signUpTreasureActivity);
router.get('/treasureactdetail', controller.getTreasureActivityDetail);
router.post('/synctreasurefind', controller.syncTreasureFind);

module.exports = router;