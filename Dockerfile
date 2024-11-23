FROM node:21-alpine

WORKDIR /app

COPY . .

RUN rm -rf package-lock.json
RUN rm -rf node_modules
RUN npm i


## EXPOSE [Port you mentioned in the vite.config file]

EXPOSE 5173/tcp

CMD ["npm", "run", "prod"]