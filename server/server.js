var express = require('express');
var bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');

var { mongoose } = require('./db/mongoose');
var { Todo } = require('./models/todo');
var { User } = require('./models/user');

var app = express();

const port = process.env.PORT || 3000;

app.use(bodyParser.json());

//add 1 todo. Body is expected to be a json with 1 field
app.post('/todos', (req, res) => {
  new Todo({ text: req.body.text })
  .save()
  .then((doc) => { res.send(doc) })
  .catch((e) => { res.status(400).send(e) });
});

//get all todos
app.get('/todos', (req, res) => {
  Todo.find()
  .then((todos) => {
    res.send({ todos })
  })
  .catch((e) => { res.status(400).send(e) })
});

//get 1 todo by id
app.get('/todos/:id', (req, res) => {
  var id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Todo.findById(id).then((todo) => {
    if (todo) {
      res.status(200).send({ todo });
    } else {
      res.status(404).send();
    }
  }).catch((e) => {
    res.status(400).send();
  });
});

//delete 1 todo by id
app.delete('/todos/:id', (req, res) => {
  var id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Todo.findByIdAndRemove(id).then((todo) => {
    if (todo) {
      res.status(200).send({ todo });
    } else {
      res.status(404).send();
    }
  }).catch((e) => {
    res.status(400).send();
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = { app };
