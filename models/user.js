const { getDb } = require("../util/database");
const mongodb = require('mongodb')

class User {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }

  save() {
    const db = getDb();
    return db.collection(process.env.db_collection_users).insertOne(this);
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
