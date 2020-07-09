FROM node

RUN mkdir /client

WORKDIR /client

ENV PATH  /client/node_modules/.bin:$PATH

COPY package*.json /client/

RUN npm install

COPY . /client/

EXPOSE 3000

CMD [ "npm" , "start"]