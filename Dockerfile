FROM node:16.14.2

WORKDIR /app

COPY package*.json ./ 
RUN npm install

COPY __tests__ ./__tests__
COPY .eslint* seed.sql jest.config.js ./

USER node

CMD [ "/bin/bash" ]
