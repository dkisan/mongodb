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

  getCart() {
    const db = getDb();
    const prodIds = this.cart.items.map(e => {
      return e.productId
    })
    return db.collection(process.env.db_collection)
      .find({ _id: { $in: prodIds } })
      .toArray()
      .then(products => {
        console.log(products)
        return products.map(p => {
          return {
            ...p, quantity: this.cart.items.find(i => {
              return i.productId.toString() === p._id.toString()
            }).quantity
          }
        })
      })
  }

  deleteFromCart(prodId) {
    const updatedCart = this.cart.items.filter(item => {
      return item.productId.toString() !== prodId.toString()        
    })
    const db = getDb();
    return db.collection(process.env.db_collection_users)
      .updateOne({ _id: new mongodb.ObjectId(this._id) }, { $set: { cart: { items: updatedCart } } })
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
