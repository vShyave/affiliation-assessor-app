## Requirements :scroll:

1. Your machine should have [Yarn](https://classic.yarnpkg.com/en/docs/install/#windows-stable) or [Npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm), [Docker](https://docs.docker.com/get-docker/), [Python](https://www.python.org/downloads/) installed.

*Note: Preferable Npm version (6.14.15) and Node version(v14.18.1)*

2. Check the node and npm version by running following commands.
```sh
node -v
npm -v
```


## Installation Steps :walking:

### 1. Fork it :fork_and_knife:

You can get your own fork/copy of [enketo](https://github.com/Samagra-Development/enketo) by using the <kbd><b>Fork</b></kbd> button.

### 2. Clone it :busts_in_silhouette:

You need to clone (download) it to a local machine using

```sh
git clone https://github.com/Your_Username/enketo.git
```

> This makes a local copy of the repository in your machine.

Once you have cloned the `enketo` repository in GitHub, move to that folder first using the change directory command.

```sh
# This will change directory to a folder FOSSologyUI
cd enketo
```

Move to this folder for all other commands.

### 3. Set it up :arrow_up:

Run the following commands to see that _your local copy_ has a reference to _your forked remote repository_ in GitHub :octocat:

```sh
git remote -v
origin  https://github.com/Your_Username/enketo.git (fetch)
origin  https://github.com/Your_Username/enketo.git (push)
```
### 4. Run it :checkered_flag:

```sh
cd enketo-express
docker run --name enketo-redis-main -p 6379:6379 -d redis
docker run --name enketo-redis-cache -p 6380:6379 -d redis
npm install
npm i -g grunt
grunt develop
```

```sh
cd ../enketo-core
npm install
npm start
```

```sh
cd ../enketo-transformer
npm install
npm start
```

```sh
cd ../forms
python3 -m http.server
```

You can preview your form on http://localhost:8005/preview?xform=http://localhost:8000/sample.xml

### 5. For integrating your backend
Customize the [submission url](https://github.com/Samagra-Development/enketo/blob/main/enketo-express/public/js/src/module/connection.js#L150) with your hosted backend. 
