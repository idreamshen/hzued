var Reply = require('../proxy').Reply;

/**
 * @desc 增加回复
 * @param next
 */
exports.add = function *(next) {
  var topicid = this.params.topic_id;
  var content = this.post.content;
  if (!this.session.hasOwnProperty('user')) {
    this.body = '您尚未登陆';
    return;
  }
  var authorid = this.session.user._id;

  var reply =  yield Reply.newAndSave(topicid, content, authorid);
  if (reply) {
    // TODO
    this.redirect('/');
  } else {
    // TODO
    this.redirect('/');
  }
};

/**
 * @desc 删除回复
 * @param next
 */
exports.delete = function *(next) {
  var topicid = this.params.topic_id;
  var reply = yield Reply.findById(topicid);
  if (reply.author_id === this.session.user._id) {
    reply.deleted = true;
    reply.update_at = new Date();
    var _reply = yield reply.save();
    if (_reply) {
      // TODO
    } else {
      // TODO
    }
  } else {
    // TODO
    this.redirect('/');
  }
};

/**
 * @desc 更新回复
 * @param next
 */
exports.update = function *(next) {
  var topicid = this.params.topic_id;
  var content = this.post.content;
  var reply = yield Reply.findById(topicid);
  if (reply.author_id === this.session.user._id) {
    reply.content = content;
    reply.update_at = new Date();
    var _reply = yield reply.save();
    if (_reply) {
      // TODO
    } else {
      // TOOD
    }
  } else {
    // TODO
  }
};