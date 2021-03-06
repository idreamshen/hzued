var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TopicSchema = new Schema({
  title: {type: String},
  content: {type: String},
  author_id: {type: Schema.ObjectId},
  visit_count: {type: Number, default: 0},
  replay_count: {type: Number, default: 0},
  deleted: {type: Boolean, default: false},
  create_at: {type: Date, default: Date.now},
  update_at: {type: Date, default: Date.now}
});

TopicSchema.virtual('author_nickname').get(function () {
  return this.author.nickname;
});
TopicSchema.virtual('author_nickname').set(function (val) {
  this.author = {
    nickname: val
  };
});

mongoose.model('Topic', TopicSchema);