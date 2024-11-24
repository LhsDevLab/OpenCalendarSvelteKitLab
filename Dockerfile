FROM node:23-alpine

ARG API_SERVER_URL

WORKDIR /app

COPY . .

RUN rm -rf package-lock.json
RUN rm -rf node_modules
RUN npm i

RUN echo "VITE_API_URL=$API_SERVER_URL" >> .env && \
    echo "PORT=5173" >> .env

RUN npm run build

ENTRYPOINT ["sh", "-c", "PORT=5173 node build"]