# Accident Thai Visualize Api

## Pre-reqs

To build and run this app locally you will need a few things:

- Install [Node.js](https://nodejs.org/en/)
- Install [MongoDB](https://www.mongodb.com/)
- Install [VS Code](https://code.visualstudio.com/)

## Getting started

- Clone the repository

```sh
git clone https://github.com/chutiphon-k/accident-thai-visualize-api
```

- Install dependencies

```
cd <project_name>
yarn install
```

## Enviroment

### For development

```
copy .env.example to .env file
```

## Swagger

The OpenAPI (Swagger) specification is a powerful definition format to describe RESTful APIs

![Swagger Image](https://i.postimg.cc/g0HXC7Hd/Screen-Shot-2564-05-17-at-00-35-24.png)

```
yarn dev
open http://localhost:<port>/api
```

## Add dataset to DB
- Add dataset file to folder temp and reanme to dataset.csv
- Send request to POST /datasets (Can send request by Swagger Ui)

## License

Nest is [MIT licensed](LICENSE).