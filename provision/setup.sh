#!/bin/bash

echo "Provisioning virtual machine..."

# fix hosts ubuntu/xenial
echo 127.0.0.1 `hostname` | sudo tee -a /etc/hosts > /dev/null

echo "Updating apt-get..."
sudo apt-get update > /dev/null

# Nginx
echo "Installing Nginx..."
sudo apt-get install -y nginx > /dev/null

# Nginx Config
echo "Configuring Nginx..."
cp /var/www/provision/config/nginx_vhost /etc/nginx/sites-available/nginx_vhost
ln -s /etc/nginx/sites-available/nginx_vhost /etc/nginx/sites-enabled/
rm -rf /etc/nginx/sites-available/default

# Restarting Nginx for config to take effect
echo "Restarting Nginx..."
service nginx restart > /dev/null

# Install Docker
echo "Installing Docker..."
sudo apt-get install -y linux-image-extra-$(uname -r) linux-image-extra-virtual > /dev/null
sudo apt-key adv --keyserver hkp://p80.pool.sks-keyservers.net:80 --recv-keys 58118E89F3A912897C070ADBF76221572C52609D > /dev/null
echo "deb https://apt.dockerproject.org/repo ubuntu-xenial main" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update > /dev/null
sudo apt-get install -y docker-engine > /dev/null

# ---------------------------------------------------------------------------------------------------------------

# TODO move this to a separate configurable file
# in order to auto-configure ip address allocation

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
