const jwt = require('jsonwebtoken');
const cartRouter = require('express').Router();
const Cart = require('../models/Cart');
const User = require('../models/User');

cartRouter.get('/', async (request, response) => {
  try {
    const carts = await Cart.find({}).populate('userId', {
      username: 1,
      name: 1,
    });
    if (process.env.NODE_ENV !== 'test') {
      console.log('getting cart');
    }

    response.json(carts);
  } catch (error) {
    response.json({ error: 'something went wrong getting the carts' });
  }
});

cartRouter.get('/:id', async (request, response) => {
  const id = request.params.id.toString();

  try {
    const findCartWithId = await Cart.findById(id);
    response.json(findCartWithId);
  } catch (error) {
    response.json({ error: 'There is no cart with that ID.' });
  }
});

cartRouter.post('/', async (request, response) => {
  const { courseTitle, author, url, imgUrl, price, rating } = request.body;

  if (request.token === undefined || request.token === null) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }

  const decodedToken = jwt.verify(request.token, process.env.SECRET);

  if (decodedToken.id === undefined || request.token === null) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }

  const user = await User.findById(decodedToken.id);
  // console.log(user);

  const cart = new Cart({
    courseTitle,
    author,
    url,
    imgUrl,
    price,
    rating,
    userId: decodedToken.id,
  });

  try {
    const savedCart = await cart.save();
    user.carts = user.carts.concat(savedCart._id);
    user.save();
    response.json(savedCart.toJSON()).status(201);
  } catch (error) {
    response
      .status(400)
      .json({ error: 'There was a problem saving the cart.' + error });
  }
});

cartRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;
  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  const cart = await Cart.findById(id.toString());
  console.log(cart);

  if (cart.userId.toString() !== decodedToken.id.toString()) {
    return response.json({
      error: 'You cannot delete carts not created by you.',
    });
  }
  try {
    await Cart.findByIdAndDelete(id);
    response.status(204).json({ message: 'cart deleted!' });
  } catch (error) {
    response.json({ error: 'The cart could not be deleted.' });
  }
});

cartRouter.put('/:id', async (request, response) => {
  const { id } = request.params;

  const { courseTitle, author, url, imgUrl, price, rating } = request.body;
  const updatedCart = { courseTitle, author, url, imgUrl, price, rating };

  try {
    const updatedCartInDb = await Cart.findByIdAndUpdate(id, updatedCart, {
      useFindAndModify: false,
    });
    console.log(updatedCartInDb);
    response.json(updatedCartInDb);
  } catch (error) {
    response
      .status(400)
      .json({ error: 'There was a problem updating that cart' });
  }
});

module.exports = cartRouter;
