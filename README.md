
# Microservices Application Base Server Environment

A simple boilerplate for microservice based applications. 
The main node is a vagrant ubuntu 16.04 instance. Containers for each
service are run on the main node and provisioned automatically.

Any number of additional service containers can be added to the API gateway. 
By adding a submodule to the /backend folder and updating the /provision/containers bash script

## Usage

1. clone / install repo `https://github.com/michaelharrisonroth/vagrant-docker-microservice-base.git`
2. install vagrant on your machine.
3. run `vagrant up` (if you are on a VPS or wish to skip the vagrant setup, you can just run the bash scripts `/provision/setup` then `/provision/containers`).
4. add 127.0.0.1 microservice.app and 127.0.0.1 api.microservice.app to your /etc/hosts

## Notes

* The frontend of the application is routed to http://microservice.app
* The api gateway of the application is routed to http://api.microservice.app
 * To update the reverse proxy settings, modify the `provision/config/nginx_vhost` config file before running `provision/setup`.
* The api-gateway and the user-service both run `nodemon` to watch files during dev, remember to update the Dockerfile for each microservice to utilize a more production ready node environment (PM2,Forever,etc.).
* To watch log output for service: `vagrant ssh` then `sudo docker logs container-name -f`
* **The docker containers are run on a private network, however this is probably not a production ready environment!**
