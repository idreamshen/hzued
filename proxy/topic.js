var Topic = require('../models/').Topic;

exports.newAndSave = function (title, content, authorid) {
  var topic = new Topic({
    title: title,
    content: content,
    author_id: authorid
  });
  return topic.save();
};

exports.getTopicsByQuery = function (conditions, projection, options) {
  return Topic
    .find(conditions, projection, options)
    .exec();
};

exports.getTopicById = function (tid) {
  return Topic
    .findOne({
      _id: tid
    })
    .exec();
};