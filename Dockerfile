FROM hypriot/rpi-node:7

RUN npm install webpack -g

RUN mkdir /code
WORKDIR /code

COPY package.json /code
RUN npm install

COPY . /code

RUN webpack

EXPOSE 80
CMD ["npm", "start"]
