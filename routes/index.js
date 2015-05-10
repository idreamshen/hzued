/**
 * Created by shenxingyu on 15/5/9.
 */
var router = require('koa-router')();

var site = require('../controllers/site.js');
var user = require('../controllers/user.js');
var topic = require('../controllers/topic.js');


router.get('/', site.index);
router.get('/topic/:id', topic.index);
router.post('/admin/login', user.adminLogin);
router.get('/admin/login', user.adminLogin);
router.get('/admin', user.adminDashboard);

module.exports = router;