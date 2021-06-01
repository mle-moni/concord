# Concord

Self hosted discord-like (work in progress)

## Setup
```bash
git clone https://github.com/mle-moni/concord && cd concord
```

### Docker
##### running dev server:
```bash
docker-compose up 
```

##### get root shell to container
```bash
docker exec -it -u 0 concord-api /bin/sh
```

##### run tests inside container
```bash
docker exec -it -u 0 concord-api npm run tests
```

### Manual install
- install npm deps:
```bash
npm i
```
- install redis
- install mysql or mariadb
- create DBs:
```bash
# open mysql command prompt
mysql -u<user> -p -h 127.0.0.1 -P 3306
```
```sql
CREATE DATABASE concord;
CREATE DATABASE concord_tests;
```
- create .env file:
```bash
cp .env.example .env
```
- edit .env file
- test your installation: 
```bash
npm run tests
```
- if tests are OK you can migrate your database: 
> :warning: **Don't skip this step, or it won't work!**
```bash
node ace migration:run
```
- and then start the server: 
```bash
node ace serve --watch
```
