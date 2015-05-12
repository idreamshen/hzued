var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ReplaySchema = new Schema({
  topic_id: {type: Schema.ObjectId},
  content: {type: String},
  athor_id: {type: Schema.ObjectId},
  deleted: {type: Boolean, default: false},
  create_at: {type: Date, default: Date.now},
  update_at: {type: Date, default: Date.now}
});

mongoose.model('Reply', ReplaySchema);