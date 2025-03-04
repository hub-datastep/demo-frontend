# Stage 1: Сборка фронта
FROM node:18-alpine as build

WORKDIR /app

# 1. Копируем только файлы зависимостей
COPY package.json yarn.lock ./

# 2. Устанавливаем зависимости и build-пакеты в одном слое
RUN apk add --no-cache --virtual .build-deps python3 make g++ \
        && yarn install --frozen-lockfile \
        && apk del .build-deps

# 3. Копируем остальные файлы проекта
COPY . .

# 4. Сборка проекта
RUN yarn run build

# Stage 2: Запуск Nginx
FROM nginx:stable-alpine

# Исправлено имя конфига (было ngnix.conf)
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 3003

CMD ["nginx", "-g", "daemon off;"]
