const { getDb } = require("../util/database");
const mongodb = require('mongodb')

class User {
  constructor(name, email, cart, id) {
    this.name = name;
    this.email = email;
    this.cart = cart;
    this._id = id;
  }

  save() {
    const db = getDb();
    return db.collection(process.env.db_collection_users).insertOne(this);
  }

  addToCart(product) {
    const cartProductIndex = this.cart.items.findIndex(cp => {
      return cp.productId.toString() === product._id.toString()
    })
    let newQuantity = 1
    let updatedCartItems = [...this.cart.items]
    if (cartProductIndex >= 0) {
      newQuantity = updatedCartItems[cartProductIndex].quantity + 1
      updatedCartItems[cartProductIndex].quantity = newQuantity
    } else {
      updatedCartItems.push({ productId: new mongodb.ObjectId(product._id), quantity: 1 })
    }
    const updatedCart = {
      items: updatedCartItems
    }
    const db = getDb();
    return db.collection(process.env.db_collection_users)
      .updateOne({ _id: new mongodb.ObjectId(this._id) }, { $set: { cart: updatedCart } })
  }

  static findById(userId) {
    const db = getDb();
    return db.collection(process.env.db_collection_users).findOne({ _id: new mongodb.ObjectId(userId) })
      .then(user => {
        return user
      })
      .catch(err => {
        console.log(err.message)
      })
  }
}

module.exports = User;
