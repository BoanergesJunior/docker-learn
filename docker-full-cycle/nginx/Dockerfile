FROM nginx:latest

COPY html /usr/share/nginx/html 

ENTRYPOINT [ "/docker-entrypoint.sh" ]

CMD [ "ngnix", "-g", "daemon off;" ]
