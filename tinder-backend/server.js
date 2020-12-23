const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const Cards = require('./dbCard.js');

//App config 
const app = express();
const port = process.env.PORT || 8001
const connectioUrl = 'mongodb+srv://admin:admin@cluster0.p5ubc.mongodb.net/tinder-clone?retryWrites=true&w=majority'

// Middleware
app.use(express.json())
app.use(cors())

// DB config
mongoose.connect(connectioUrl, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
})

//API endpoints
app.get('/', (req, res) => {
    res.status(200).send("Server is runnning")
})

app.post('/tinder/cards', (req, res) => {
  const dbCards = req.body
  console.log(dbCards)
  Cards.create(dbCards, (err, data) => {
    if(err){
      res.status(500).send(err)
    } else {
      res.status(200).send(data)
    }
  })
})

app.get('/tinder/cards', (req, res) => {
  Cards.find((err, data) => {
    if(err) {
      res.send(500).send(err)
    }
      res.status(200).send(data)

  })
})

// Listener
app.listen(port, () => {
  console.log('Server is running on :'+  port)
})