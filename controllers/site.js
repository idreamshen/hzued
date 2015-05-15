var Topic = require('../proxy/').Topic;
var User = require('../proxy/').User;

/**
 * @desc 首页控制器
 * @param next
 */
exports.index = function *(next) {
  var topics = yield Topic.getTopicsByQuery({}, {limit:6, sort:{create_at: -1}});
  for (var i in topics) {
    var topic = topics[i];
    var authorid = topic.author_id;
    var user = yield User.getUserById(authorid);
    var nickname = user.nickname;
    topic.author_nickname = nickname;
  }
  this.render("index", {
    topics: topics
  });
};