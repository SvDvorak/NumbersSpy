FROM node

ENV HOME=/home/node

COPY package.json $HOME/numberspy/
WORKDIR $HOME/numberspy
RUN npm install
COPY . $HOME/numberspy/