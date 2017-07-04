const { MongoClient, ObjectID } = require('mongodb')

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  // if (err) {
  //   return console.log('Unable to connect to MongoDB server')
  // }
  // console.log('Connected to MongoDB server');
  //
  // db.collection('Todos').deleteMany({ text: 'Eat pussy' })
  //   .then((result) => {
  //     console.log(result);
  //   });

  // db.collection('Todos').deleteOne({ text: 'Fight dragons' })
  //   .then((result) => {
  //     console.log(result);
  //   });

  // db.collection('Todos').findOneAndDelete({ completed: false })
  //   .then((result) => {
  //   console.log(result);
  // })

  // db.collection('Users').deleteMany({ name: 'Khai' }).then();
  // db.collection('Users').deleteOne({
  //   _id: new ObjectID('595ae37a22688f20ab4e1dcd')
  // }).then();

  db.collection('Users').deleteOne({ name: 'Mike' });

  // db.close();
});
