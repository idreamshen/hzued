/**
 * Created by shenxingyu on 15/5/9.
 */
var router = require('koa-router')();

var site = require('../controllers/site.js');
var user = require('../controllers/user.js');
var topic = require('../controllers/topic.js');
var admin = require('../controllers/admin.js');
var reply = require('../controllers/reply.js');
var ftk = require('../controllers/ftk.js');

/**
 * 首页
 */
router.get('/', site.index);
/**
 * 话题
 */
router.get('/topic/:topic_id', topic.index);
router.post('/topic/:topic_id/reply', reply.add);
/**
 * 登陆
 */
router.get('/login', user.login);
router.post('/login', user.login);
/**
 * 注册
 */
router.get('/register', user.register);
router.post('/register', user.register);
/**
 * 天黑请闭眼，find the killer
 */
router.get('/ftk/', ftk.index);
/**
 * 后台
 */
router.get('/admin', admin.index);
router.post('/admin/login', admin.login);
router.get('/admin/login', admin.login);
router.post('/admin/logout', admin.logout);
router.post('/admin/topic/add', topic.add);
router.post('/admin/topic/:topic_id/del', topic.del);
router.post('/admin/topic/:topic_id/edit', topic.edit);

module.exports = router;