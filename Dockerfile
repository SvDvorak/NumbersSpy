FROM nginx

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY site /var/www/site