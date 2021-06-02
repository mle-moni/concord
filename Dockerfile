FROM node:16-alpine

## Download wait script
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.9.0/wait /wait
RUN chmod +x /wait

## Launch the wait tool and then the application
CMD /wait && sh ./launch.sh
