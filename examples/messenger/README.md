# Swarm Messenger
Messenger based on PSS protocol.

The project works with local instanse of swarm, port `8546`

Endpoint `ws://127.0.0.1:8546`

## Getting Started
### Setting up
Make sure you have installed the necessary dependencies using `yarn`:

```sh
$ yarn
```

### Running
To run the development version of the web application, run the following
command in your command prompt:

```sh
$ npm start
```

This will host the web application at http://localhost:3000. The host
and port can be customized using respectively the environmental variables
`HOST` and `PORT`. Any changes made on the code base are detected and
will hot reload changed parts of the application.

### Building
To build a production version of the web application, run the following,
command in your command prompt:

```sh
$ npm run build
```

This will build both the server and client bundle in the `build/`
directory. After building, the production server that serves the web
application can be launched using:

```sh
$ node build/index.js
```

This will host the web application at http://localhost:3000. The host
and port can be customized using respectively the environmental variables
`HOST` and `PORT`. Any changes made on the code base are detected and
will hot reload changed parts of the application.

### Deployment
To deploy the project, build it and deploy `build/` directory.