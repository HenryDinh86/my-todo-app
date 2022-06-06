###########
# STAGE 1
FROM node:16.15.0-alpine as builder

# install openssl package inside the container to generate self signed certificate
RUN apk add openssl

# set the working dir for container
WORKDIR /frontend

# copy the json file first
COPY package*.json ./

# install npm dependencies
RUN npm install

COPY . ./

# build the folder
RUN npm run build

# create self-signed SSL certificate
RUN openssl req -x509 -nodes -days 365 \
  -subj "/C=AU/ST=NSW/O=Henry Dinh/CN=henry.lexdsolutions.com" \
  -addext "subjectAltName=DNS:todo.henrydinh.com" \
  -newkey rsa:2048 \
  -keyout ./nginx_selfsigned.key \
  -out ./nginx_selfsigned.crt


###########
# STAGE 2
FROM nginx:1.20

# copy the compliled frontend code from builder into nginx container
COPY --from=builder /frontend/build /usr/share/nginx/html

# copy the self signed key and certificate from builder into nginx container
COPY --from=builder /frontend/nginx_selfsigned.key /etc/nginx/certs/nginx_selfsigned.key
COPY --from=builder /frontend/nginx_selfsigned.crt /etc/nginx/certs/nginx_selfsigned.crt

# copy the nginx config file for nginx
COPY /nginx.conf /etc/nginx/conf.d/default.conf