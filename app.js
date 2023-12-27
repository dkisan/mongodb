const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const mongoose = require('mongoose')

const dotenv = require('dotenv')

const errorController = require('./controllers/error');

const app = express();

dotenv.config()

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
// const User = require('./models/user');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// app.use((req, res, next) => {
//   User.findById('658aad94f194e37487100322')
//     .then(user => {
//       req.user = new User(user.name, user.email, user.cart, user._id);
//       next();
//     })
//     .catch(err => console.log(err));
//   // next()
// });

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose.connect(process.env.mongo_url)
  .then(() => {
    app.listen(3000)
    console.log('server started')
  })
  .catch(err => {
    console.log(err.message)
  })
