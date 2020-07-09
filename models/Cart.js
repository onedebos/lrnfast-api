const mongoose = require('mongoose');
const config = require('../utils/config');

mongoose.connect(config.DB_LINK, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const cartSchema = mongoose.Schema({
  courseTitle: {
    type: String,
    required: true,
  },
  author: String,
  url: {
    type: String,
    required: true,
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
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

cartSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
