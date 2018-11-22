# minimal-react-webpack-babel-setup

Forked and updated to demonstrate bugs with the optimization.splitChunks.maxSize option in webpack config

Run
```
npm run build
```

and then notice the following crash:

```
> minimal-react-webpack-babel-setup@1.0.0 build ........./minimal-react-webpack-babel-setup
> webpack --config ./webpack.config.js --mode production

............/minimal-react-webpack-babel-setup/node_modules/webpack/lib/util/deterministicGrouping.js:168
				leftSize += group.nodes[left].size;
				                              ^

TypeError: Cannot read property 'size' of undefined
    at module.exports (......../minimal-react-webpack-babel-setup/node_modules/webpack/lib/util/deterministicGrouping.js:168:35)
    at compilation.hooks.optimizeChunksAdvanced.tap.chunks (......../minimal-react-webpack-babel-setup/node_modules/webpack/lib/optimize/SplitChunksPlugin.js:797:23)
```

Second Issue:
Inside webpack.config.js, uncomment the line:
```
//enforce: true, // create chunk regardless of the size of the chunk
```
from the 'vendors' cacheGroup, then run the build again, this time notice that we no longer have a crash, but the build now hangs forever.

This was tested using webpack v4.23.1


original repo readme:
=====================

[![Build Status](https://travis-ci.org/rwieruch/minimal-react-webpack-babel-setup.svg?branch=master)](https://travis-ci.org/rwieruch/minimal-react-webpack-babel-setup) [![Slack](https://slack-the-road-to-learn-react.wieruch.com/badge.svg)](https://slack-the-road-to-learn-react.wieruch.com/) [![Greenkeeper badge](https://badges.greenkeeper.io/rwieruch/minimal-react-webpack-babel-setup.svg)](https://greenkeeper.io/)

Read more about it: [The Minimal React Webpack Babel Setup](https://www.robinwieruch.de/minimal-react-webpack-babel-setup/)

## Features

* React 16
* Webpack 4
* Babel 7
* Hot Module Replacement

## Installation

* `git clone git@github.com:rwieruch/minimal-react-webpack-babel-setup.git`
* cd minimal-react-webpack-babel-setup
* npm install
* npm start
* visit `http://localhost:8080/`
