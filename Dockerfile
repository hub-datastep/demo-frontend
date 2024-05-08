# Stage 1: Сборка фронта
FROM node:18-alpine as build

WORKDIR /app

COPY package.json yarn.lock /app/

# For running on Mac M1
RUN apk --update --no-cache --virtual build-dependencies add \
        python3 \
        make \
        g++

RUN yarn install

RUN apk del build-dependencies

COPY . /app/

RUN yarn run build


# Stage 2: Запуск Nginx
FROM nginx:stable-alpine

COPY ngnix.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 3003

CMD ["nginx", "-g", "daemon off;"]
