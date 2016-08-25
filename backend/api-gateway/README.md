# API Gateway Service

The API gateway is a nodejs express application docker container that handles routing
and serving all of the applications endpoints + protocol connections (REST API, Websockets, Etc.)

### Auth Routes

* `POST /v1/login` `{username: '', password: ''}`
* `POST /v1/register` `{username: '', password: '', email: ''}`

### REST Routes 

**Authenticated routes must have either:**

* query parameter: `?token={token}`
* header: `x-access-token {token}`
* json body parameter: `{"token": "{token}"}`

All authenticated routes must utilize the `x-authorized` header to pass the current authorized user to all requests.
This allows for object level permission authorizations.

**Current REST Routes**

* `GET` `POST` /v1/user 
* `GET` `PUT` `DELETE` /v1/user/{id}
