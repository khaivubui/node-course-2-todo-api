const { ObjectID } = require('mongodb');

const { mongoose } = require('./../server/db/mongoose');
const { Todo } = require('./../server/models/todo');
const { User } = require('./../server/models/user');

// var id = '595c7b25eec9fe232b21a9ca';
//
// if (!ObjectID.isValid(id)) {
//   console.log('Invalid ID');
// }

// Todo.find({
//   _id: id
// }).then((todos) => {
//   console.log('Todos', todos);
// })
//
// Todo.findOne({
//   _id: id
// }).then((todo) => {
//   console.log('Todo', todo);
// })

// Todo.findById(id).then((todo) => {
//   if (!todo) { return console.log('Id not found') }
//   console.log('Todo by Id', todo);
// }).catch((e) => { console.log(e) });

User.findById('595c30752d0526b7235bd8fc')
.then((user) => {
  if (!user) { console.log('No matching user') }
  else { console.log('User found', user) }
})
.catch((e) => { console.log(e) });
