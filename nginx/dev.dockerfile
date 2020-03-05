FROM nginx
COPY ./nginx-dev.conf /etc/nginx/conf.d/nginx-dev.conf
EXPOSE 80