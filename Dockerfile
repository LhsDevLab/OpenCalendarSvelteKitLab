FROM node:23-alpine

ARG API_SERVER_URL

WORKDIR /app

COPY . .

RUN rm -rf package-lock.json
RUN rm -rf node_modules
RUN npm i

RUN VITE_API_URL=$API_SERVER_URL > .env

RUN npm run build

EXPOSE 5173/tcp

CMD ["PORT=5173", "node", "build"]