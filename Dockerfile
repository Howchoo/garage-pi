FROM rpi-node:7


RUN mkdir /code
WORKDIR /code

COPY package.json /code
RUN npm install

COPY . /code

EXPOSE 80
CMD ["npm", "start"]
