FROM node:21-alpine

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN rm -rf node_modules
RUN npm i

COPY . .

## EXPOSE [Port you mentioned in the vite.config file]

EXPOSE 5173/tcp

CMD ["npm", "run", "prod"]