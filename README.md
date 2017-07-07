# node-course-2-todo-api
API for todo app<br/>
No front end built.</br>
Recommended for use using Postman<br/>

<h3>********* Users ********* </h3>

<h3>POST https://immense-mountain-81221.herokuapp.com/users</h3>
this creates a user in MongoDB<br/>
req.body should be a JSON object with 2 fields { email, password }<br/>
res.head will contain a valid token<br/>

<h3>POST https://immense-mountain-81221.herokuapp.com/users/login</h3>
this must be used with email and password matching a created pair<br/>
req.body should be a JSON object with 2 fields { email, password }, matching a user in MongoDB<br/>
res.head will contain a valid token<br/>

<h3>DELETE https://immense-mountain-81221.herokuapp.com/users/me/token</h3>
this deletes an existing token, which is equivalent of logging out<br/>
req.head must contain a valid token<br/>

<h3>GET https://immense-mountain-81221.herokuapp.com/users/me/</h3>
this displays the current user, given a valid token<br/>
res.body will show a user<br/>
req.head must contain a token<br/>

<h3>********* Todos ********* </h3>

<h3>POST https://immense-mountain-81221.herokuapp.com/todos</h3>
this creates a new todo in MongoDB<br/>
req.head must contain a valid token<br/>
req.body must contain a JSON with 1 field { text }<br/>

<h3>GET https://immense-mountain-81221.herokuapp.com/todos</h3>
this gets all todos created by the associated user<br/>
req.head must contain a valid token<br/>

<h3>GET https://immense-mountain-81221.herokuapp.com/todos/:id</h3>
this gets 1 todo given unique id<br/>
req.head must contain a valid token, associated with the creator of the todo<br/>

<h3>DELETE https://immense-mountain-81221.herokuapp.com/todos/:id</h3>
this deletes 1 todo given unique id<br/>
req.head must contain a valid token, associated with the creator of the todo<br/>

<h3>PATCH https://immense-mountain-81221.herokuapp.com/todos/:id</h3>
this modifies 1 todo given unique id<br/>
req.head must contain a valid token, associated with the creator of the todo<br/>
req.body must contain a JSON with 1 field { text }<br/>
