const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  userId:{
    type: Schema.Types.ObjectId,
    ref:'User',
    required: true
  }
})

module.exports = mongoose.model('Product',productSchema)

// const getDb = require('../util/database').getDb;
// const mongodb = require('mongodb')

// class Product {
//   constructor(title, price, imageUrl, description, id, userId) {
//     this.title = title
//     this.price = price
//     this.imageUrl = imageUrl
//     this.description = description
//     this._id = id ? new mongodb.ObjectId(id) : null
//     this.userId = userId
//   }

//   save() {
//     const db = getDb();
//     let dbOp;
//     if (this._id) {
//       dbOp = db.collection(process.env.db_collection).updateOne({ _id: this._id }, { $set: this })
//     } else {
//       dbOp = db.collection(process.env.db_collection)
//         .insertOne(this)
//     }
//     return dbOp
//       .then(result => {
//         console.log('added')
//       })
//       .catch(err => {
//         console.log(err.message)
//       })
//   }

//   static fetchAll() {
//     const db = getDb();
//     return db.collection(process.env.db_collection)
//       .find()
//       .toArray()
//       .then(products => {
//         return products
//       })
//       .catch(err => {
//         console.log(err.message)
//       })
//   }

//   static findById(prodId) {
//     const db = getDb();
//     return db.collection(process.env.db_collection)
//       .find({ _id: new mongodb.ObjectId(prodId) })
//       .next()
//       .then(product => {
//         return product
//       })
//       .catch(err => {
//         console.log(err.message)
//       })
//   }

//   static deleteById(prodId) {
//     const db = getDb()
//     return db.collection(process.env.db_collection)
//       .deleteOne({ _id: new mongodb.ObjectId(prodId) })
//       .then(product => {
//         return product
//       })
//       .catch(err => {
//         console.log(err.message)
//       })
//   }
// }

// module.exports = Product;
