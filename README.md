Pasito a Paso Project
=======================


Table of Contents
-----------------
1. [Requirements](#requirements)
1. [Setup](#setup)
1. [Usage](#usage)
1. [Structure](#structure)

Requirements
------------

* node `^4.2.0`
* npm `^3.0.0`

Setup
---------------

```shell
$ git clone https://github.com/Lendsnap/Lendsnap-Lender-UI.git
$ cd <git folder>
$ sudo npm i -g cloudfront-invalidate-cli
$ npm install                   # Install Node modules (./package.json take a coffee!!)
$ npm run dev                   # Compile and launch the App
```

Usage
-----

* `npm run dev` - serve the app at: `localhost:9000` (Hot node refresh enabled).
* `npm run lint`- Lint all `.js` files.
* `npm run lint:fix` - Lint and fix all `.js` files. [Read more on this](http://eslint.org/docs/user-guide/command-line-interface.html#fix).
* `npm run deploy:test` - Deploys the app to test environment
* `npm run deploy:staging` - Deploys the app to staging environment
* `npm run deploy:demo` - Deploys the app to demo environment
* `npm run deploy:production` - Deploys the app to production environment. AWS credentials required in bashrc file [Read more on this](https://www.npmjs.com/package/s3-deploy#aws-credentials)


Structure
---------

```
.
├── bin                      # Build/Start scripts
├── build                    # All build-related configuration
│   ├── webpack              # Environment-specific configuration files for webpack
│   └── Karma                # Environment-specific configuration files for Karma
├── config                   # Project configuration settings
├── server                   # Koa application (uses webpack middleware)
│   └── main.js              # Server application entry point
├── src                      # Application source code
│   ├── actions              # Redux Actions
│   ├── assets               # Styles and fonts of the app
│       ├──fonts             # All App Fonts
│       ├──static            # All static files and images
│       └── *.scss           # Sass Style files
│   ├── components           # Generic and reusable React Components
│   ├── constants            # Constants for actions and Global constants
│   ├── reducers             # Redux Reducers
│   │   └── *.js             # All Components files
│   ├── utils                # Javascript functionalities re-utilizable
│   │   └── index.js         # Imports all files
│   │   └── *.js             # Each functionality file
│   ├── views                # Collection of views
│   │   └─── **              # folder by App View normally served by the router
│   │     └── *.js           # Redux-specific helpers
│   │     └── *.scss         # Specific sass for the view
│   │   └─── App.js          # Views Entry point
│   │   └─── Root.js         # Router Entry point
│   ├── configureStore       # App state
│   ├── index.html           # Main App html
│   └── main.js              # store init, history and render function
│   └── routes.js            # Defines App routes
└── tests                    # Unit tests
```

### Globals

These are global variables available to you anywhere in your source code. If you wish to modify them, they can be found as the `globals` key in `~/config/_base.js`. When adding new globals, also add them to `~/.eslintrc`.

* `process.env.NODE_ENV` - the active `NODE_ENV` when the build started
* `__DEV__` - True when `process.env.NODE_ENV` is `development`
* `__PROD__` - True when `process.env.NODE_ENV` is `production`
* `__TEST__` - True when `process.env.NODE_ENV` is `test`
* `__STAGING__` - True when `process.env.NODE_ENV` is `test`
* `__BASENAME__` - [npm history basename option](https://github.com/rackt/history/blob/master/docs/BasenameSupport.md)
