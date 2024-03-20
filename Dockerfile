FROM node:14

WORKDIR /vacomm
COPY package.json .
RUN npm install
COPY . .
EXPOSE 3030
CMD npm start
