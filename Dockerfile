FROM node:8.17.0-alpine

WORKDIR /opt/app
COPY . .
RUN npm install

WORKDIR /opt/app

ENV PORT=3000
EXPOSE $PORT
CMD ["npm", "start"]
