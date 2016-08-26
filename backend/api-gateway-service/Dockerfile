FROM node:4

# Setup Environment Vars
# TODO from config file / service discovery DNS?
ENV USER_SERVICE_ENDPOINT http://10.10.0.4:8080

# ----------------------------------------------

# Create app directory
ADD ./src/package.json /tmp/package.json

# npm install
RUN cd /tmp && npm install

# copy over node modules
RUN mkdir -p /usr/src/app && cp -a /tmp/node_modules /usr/src/app/

WORKDIR /usr/src/app

# install forever
RUN npm install -g nodemon
#RUN npm install -g forever

EXPOSE 8080

# Prod
#CMD forever app.js

# For Dev
CMD nodemon app.js -L