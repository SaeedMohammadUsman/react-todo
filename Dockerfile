# syntax=docker/dockerfile:1

ARG NODE_VERSION=22.20.0

# ---------------------------------------------------------
# Build stage
# ---------------------------------------------------------
FROM node:${NODE_VERSION}-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build


# ---------------------------------------------------------
# Production stage
# ---------------------------------------------------------
FROM nginx:alpine AS final

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]