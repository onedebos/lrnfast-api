const app = require('./index');
const cartRoute = require('./controller/cartRouter');
const usersRoute = require('./controller/userRouter');
const loginRoute = require('./controller/loginRouter');
const middleware = require('./utils/middleware');

app.use(middleware.tokenExtractor);
app.use('/api/carts', cartRoute);
app.use('/api/users', usersRoute);
app.use('/api/login', loginRoute);

app.use(middleware.unknownEndPoint);

module.exports = app;
