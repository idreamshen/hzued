var Topic = require('../proxy').Topic;
var User = require('../proxy').User;

/**
 * @desc 话题详情
 */
exports.index = function *(next) {
  var topicid = this.params.topic_id;
  var topic = yield Topic.getTopicById(topicid);
  var authorid = topic.author_id;
  var user = yield User.getUserById(authorid);
  var nickname = user.nickname;
  topic.author_nickname = nickname;
  if (topic) {
    topic.visit_count++;
    topic.save();
    this.render('topic', {topic: topic});
  } else {
    // TODO
    this.redirect('/');
  }
};

/**
 * @desc 增加话题
 * @param next
 */
exports.add = function *(next) {
  var title = this.post.title;
  var content = this.post.content;
  var authorid = this.session.user._id;
  var topic = yield Topic.newAndSave(title, content, authorid);
  if (topic) {
    this.redirect('/admin');
  } else {
    // TODO
    this.redirect('/admin');
  }
};

/**
 * @desc 软删除话题
 * @param next
 */
exports.del = function *(next) {
  var tid = this.params.topic_id;
  var topic = yield Topic.getTopicById(tid);
  if (topic) {
    if (topic.author_id === this.session.user._id) {
      topic.deleted = true;
      topic.update_at = new Date();
      topic.save();
      this.redirect('/admin');
    } else {
      this.redirect('/admin');
    }
  } else {
    this.redirect('/admin');
  }
};

/**
 * @desc 编辑话题
 * @param next
 */
exports.edit = function *(next) {
  var tid = this.params.topic_id;
  var title = this.post.title;
  var content = this.post.content;
  var topic = yield Topic.getTopicById(tid);
  if (topic) {
    if (topic.author_id === this.session.user._id) {
      topic.title = title;
      topic.content = content;
      topic.update_at = new Date();
      topic.save();
      this.redirect('/admin');
    }
  } else {
    this.redirect('/admin');
  }
};