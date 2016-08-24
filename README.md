
# Microservices Application Base Server Environment

A simple boilerplate for microservice based applications. 
The main node is a vagrant ubuntu 16.04 instance. Containers for each
service are run on the main node and provisioned automatically.

The API gateway is a nodejs express application that handles routing
and serving all of the applications endpoints. 

An authentication service container acts as middlewear to the requests.

Any number of additional service containers can be added to the API gateway.