var Reply = require('../models').Reply;

exports.newAndSave = function (topicid, content, authorid) {
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