var Reply = require('../models').Reply;
var Topic = require('../models').Topic;

exports.newAndSave = function *(topicid, content, authorid) {
  var topic = yield Topic.findById(topicid);
  topic.replay_count++;
  topic.save();
  var reply = new Reply({
    topic_id: topicid,
    content: content,
    author_id: authorid
  });
  return reply.save();
};

exports.findById = function (topicid) {
  return Reply.findById(topicid).exec();
};