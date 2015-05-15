var Topic = require('../models/').Topic;

exports.newAndSave = function (title, content, authorid) {
  var topic = new Topic({
    title: title,
    content: content,
    author_id: authorid
  });
  return topic.save();
};

exports.getTopicsByQuery = function (query, options) {
  return Topic
    .find(query, {}, options)
    .exec();
};

exports.getTopicById = function (tid) {
  return Topic
    .findOne({
      _id: tid
    })
    .exec();
};