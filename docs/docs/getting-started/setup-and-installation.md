---
sidebar_position: 1
---

# Setup and Installation

## System Requirements

The primary requirements of the project include [**NodeJS**](https://nodejs.org/en/) and [**Docker**](https://www.docker.com/). Multiple ```node``` versions have been used and hence it is recommended that you have the latest version of ```NVM - Node Version Manager``` installed on your computer. A ```.nvmrc``` file will be added to every directory in order to make sure that the current ```node``` version is being used to build it.

:::info

**Recommended :** NPM version (6.14.15) and Node version (v14.18.1) and Ubuntu OS version (18.04)
Your machine should have [Yarn](https://yarnpkg.com/) / [NPM](https://www.npmjs.com/) & [Python](https://www.python.org/) installed.

You can check your ```node``` and ```npm``` versions by running the following commands

```
node -v
npm -v
```

:::

## Installation

In order to make the process of getting started with the project as easy and seamless as possible, we have a single command setup for enabling fast and convenient setup.

👉 Go ahead and fork the repository to get your own copy by clicking on the ```Fork``` button.

👉 Clone the repository and select the **workflow** directory as the current directory.

```bash
git clone https://github.com/Samagra-Development/workflow
cd workflow
```

👉 Setup and all start packages and applications by running this single command
```bash
npm run start
```

This command should setup and initialize all the different packages on which the project depends on and also start the sample application for you to experiment with.

👉 The repository is structured as a **monorepo** managed using [**Turborepo**](https://turborepo.org/) in order to cache and speed up builds, create pipelines and enabling the concurrent execution of scripts, all of which result in an improved Developer Experience (DX). Active work continues on this and progress can be tracked [**here**](https://github.com/Samagra-Development/workflow) 

:::tip

Make sure you have ```Docker``` installed on your system as some of the packages depend on underlying docker containers. The team is currently planning to shift all servers to containers. You can track the progress on this migration [here](https://github.com/Samagra-Development/workflow/issues/14)

:::