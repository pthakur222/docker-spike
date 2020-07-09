FROM node

WORKDIR /client

COPY package*.json /client/

RUN npm install

COPY . /client/

ENV DEBUG=*

EXPOSE 3000

CMD [ "npm" , "start"]