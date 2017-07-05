const { ObjectID } = require('mongodb');

const { mongoose } = require('./../server/db/mongoose');
const { Todo } = require('./../server/models/todo');
const { User } = require('./../server/models/user');

// Todo.remove({}).then((result) => {
//   console.log(result);
// });

// Todo.findOneAndRemove({ _id: '595d2dc7ebdd72d858ed36c4'})
// .then((todo) => {
//
// });

Todo.findByIdAndRemove('595d2dc7ebdd72d858ed36c4').then((todo) => {
  console.log(todo);
});
