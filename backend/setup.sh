#!/bin/bash

# Start Docker
echo "Starting Docker"
sudo service docker start > /dev/null

# Setup App Backend
echo "Setting Up Docker Network And Containers"

# setup private network
sudo docker network create --subnet=10.10.0.0/16 dockernet > /dev/null

# Setup API Gateway
cd /var/www/backend/api-gateway
sudo docker build -t mhr/gateway . > /dev/null
sudo docker run --net dockernet --ip 10.10.0.2 -d mhr/gateway > /dev/null

# Setup Container X...
# docker build -t ...
# docker run --net dockernet --ip 10.10.0.3 -it ...

# Setup Container Y...
# docker build -t ...
# docker run --net dockernet --ip 10.10.0.4 -it ...
