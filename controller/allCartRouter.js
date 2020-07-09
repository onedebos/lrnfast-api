const AllCartsRouter = require('express').Router();
const AllCarts = require('../models/AllCarts');

AllCartsRouter.get('/', async (request, response) => {
  try {
    const allCarts = await AllCarts.find({});
    response.json(allCarts);
  } catch (error) {
    response.json({ error: 'something went wrong getting the cart.' });
  }
});

AllCartsRouter.post('/', async (request, response) => {
  const { courseTitle, author, url, imgUrl, price, rating } = request.body;
  const cart = new AllCarts({
    courseTitle,
    author,
    url,
    imgUrl,
    price,
    rating,
  });

  try {
    const savedCart = await cart.save();
    return response.json(savedCart.toJSON()).status(201);
  } catch (error) {
    return response
      .status(400)
      .json({ error: `There was a problem saving the cart.${error}` });
  }
});

module.exports = AllCartsRouter;
