const mongodb = require('mongodb')
const Mongoclient = mongodb.MongoClient

let _db;

const mongoConnect = callback => {
  Mongoclient.connect(process.env.mongo_url)
    .then(client => {
      console.log('connected')
      _db = client.db()
      callback()
    })
    .catch(err => {
      console.log(err.message)
    })
}

function getDb(){
  if(_db){
    return _db
  }else{
    throw 'No database found'
  }
}


exports.mongoConnect = mongoConnect;
exports.getDb = getDb;