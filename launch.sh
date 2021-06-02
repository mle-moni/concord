# some color vars
BLUE='\033[0;34m'
NC='\033[0m' # No Color

npm i && # install dependencies
stat .env > /dev/null 2> /dev/null || cp .env.example .env && # create .env if not exist
node ace migration:run && # migrate database
npm run docs && # generate doc
printf "\n\n${BLUE}api documentation available at http://localhost:7890/apidoc${NC}\n\n" &&
npm run dev # start api server
