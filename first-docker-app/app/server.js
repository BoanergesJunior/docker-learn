const express = require('express');
const path = require('path');
const fs = require('fs');
const MongoClient = require('mongodb').MongoClient;

const app = express();
const MONGO_URL = 'mongodb://admin:password@localhost:27017'

app.use(express.urlencoded())
app.use(express.json())

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, "index.html"))
})

app.get('/get-profile', function (req, res) {
  MongoClient.connect(MONGO_URL, function (err, client) {
    if (err) throw err;

    const db = client.db('user-account');

    const query = { userId: 1 }

    return db.collection('users').findOne(query)
  })

  res.sendFile(path.join(__dirname, "index.html"))
})

app.get('/profile-picture', function (req, res) {
  let img = fs.readFileSync('images/profile-1.jpg')
  res.writeHead(200, { 'Contet-type': 'image/jpg' })
  res.end(img, 'binary')
})

app.post('/update-profile', function (req, res) {
  const userObj = req.body
  console.log(userObj);
  console.log('Connectiong to the db...');

  MongoClient.connect(MONGO_URL, function (err, client) {
    if (err) throw err

    const db = client.db('user-account');
    userObj['userId'] = 1
    const query = { userId: 1 }
    const newValues = { $set: userObj }

    console.log('Successfully connected to the user-account db');

    return db.collection('users').updateOne(query, newValues, { upsert: true })
  })
})

app.listen(3000, function () {
  console.log("app listening on port 3000!");
});
