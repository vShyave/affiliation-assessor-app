FROM ubuntu:20.04

RUN apt update && apt install -y build-essential curl wget jq
RUN curl -fsSL https://deb.nodesource.com/setup_14.x | bash -
RUN apt-get install -y nodejs
RUN npm i -g pnpm@7 
RUN npm i -g pm2
WORKDIR /app
COPY enketo-core enketo-core
COPY enketo-express enketo-express
WORKDIR enketo-express
RUN pnpm i 
CMD ["bash", "start.sh"]