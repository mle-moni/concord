# Concord

Self hosted discord-like (work in progress)

## Setup
```bash
git clone https://github.com/mle-moni/concord && cd concord
```
- install mysql / mariadb
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
node -r @adonisjs/assembler/build/register japaFile.ts
```
- (you can alias the test command, personnally I aliased it to ado-tests)
- if tests are OK you can migrate your database: 
```bash
node ace migration:run
```
- and then start the server: 
```bash
node ace serve --watch
```
