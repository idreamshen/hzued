/**
 * Created by shenxingyu on 15/5/9.
 */
var router = require('koa-router')();

var site = require('../controllers/site.js');
var user = require('../controllers/user.js');
var topic = require('../controllers/topic.js');
var admin = require('../controllers/admin.js');
var reply = require('../controllers/reply.js');


router.get('/', site.index);
router.get('/topic/:topic_id', topic.index);
router.post('/topic/:topic_id/reply', reply.add);

router.get('/admin', admin.index);

router.post('/admin/login', admin.login);
router.get('/admin/login', admin.login);
router.post('/admin/logout', admin.logout);

router.post('/admin/topic/add', topic.add);
router.post('/admin/topic/:topic_id/del', topic.del);
router.post('/admin/topic/:topic_id/edit', topic.edit);

module.exports = router;