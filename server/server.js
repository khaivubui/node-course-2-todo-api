require('./config/config')

const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');
const _ = require('lodash');

var { mongoose } = require('./db/mongoose');
var { Todo } = require('./models/todo');
var { User } = require('./models/user');
var { authenticate } = require('./middleware/authenticate');

var app = express();

const port = process.env.PORT;

app.use(bodyParser.json());

// ****************** Todo(s) ******************

//                  - POST -
//add 1 todo. Body is expected to be a json with 1 field
app.post('/todos', (req, res) => {
  new Todo({ text: req.body.text })
  .save()
  .then((doc) => { res.send(doc) })
  .catch((e) => { res.status(400).send(e) });
});

//                  - GET -
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

//                  - DELETE -
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

//                  - PATCH -
//modify 1 todo by id. Body is expected to be a json
app.patch('/todos/:id', (req, res) => {
  var id = req.params.id;
  var body = _.pick(req.body, ['text', 'completed']);

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findByIdAndUpdate(id, { $set: body }, { new: true })
  .then((todo) => {
    if (!todo) { res.status(404).send() }
    else { res.send({ todo }) }
  })
  .catch((e) => { res.status(400).send() });
});

// ****************** User(s) ******************

//                  - POST -
//add 1 user
app.post('/users', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);
  var user = new User(body);

  user.save().then(() => {
    return user.generateAuthToken();
  }).then((token) => {
    res.header('x-auth', token).send(user);
  }).catch((e) => { res.status(400).send(e) });
});

//login
app.post('/users/login', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);

  User.findByCredentials(body.email, body.password).then((user) => {
    return user.generateAuthToken().then((token) => {
      res.header('x-auth', token).send(user);
    });
  }).catch((e) => {
    res.status(400).send();
  });
});

//                  - GET -
app.get('/users/me', authenticate,(req, res) => {
  res.send(req.user);
});

// ****************** _ ******************

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = { app };
