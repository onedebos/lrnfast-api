// require('dotenv/config');
const mongoose = require('mongoose');

mongoose.connect(process.env.DB_LINK, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const AllCartSchema = mongoose.Schema({
  courseTitle: {
    type: String,
  },
  author: String,
  url: {
    type: String,
  },
  imgUrl: {
    type: String,
  },
  price: {
    type: Number,
  },
  rating: {
    type: Number,
  },
});

AllCartSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const AllCart = mongoose.model('AllCart', AllCartSchema);

module.exports = AllCart;
