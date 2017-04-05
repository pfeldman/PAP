/* eslint key-spacing:0 spaced-comment:0 */
import _debug from 'debug'
import path from 'path'
import { argv } from 'yargs'

const debug = _debug('app:config:_base')
const config = {
  env : process.env.NODE_ENV || 'development',
  develop_mode: process.env.DEVELOPMODE || false,

  // ----------------------------------
  // Project Structure
  // ----------------------------------
  path_base  : path.resolve(__dirname, '../'),
  dir_client : 'src/',
  dir_dist   : 'dist',
  dir_server : 'server',
  dir_test   : 'tests',

  // ----------------------------------
  // Server Configuration
  // ----------------------------------
  server_host : process.env.HOST || 'localhost',
  server_port : process.env.PORT || 80,
  backend_host : process.env.BE_HOST || 'api.lendsnap.com',
  backend_base_url : process.env.BE_BASE || '/api/',
  backend_https: process.env.BE_HTTPS || false,
  backend_port :  process.env.BE_PORT || 80,
  server_url : process.env.URL || '/', 
  relative_path : process.env.RELATIVE_PATH || false,

  // ----------------------------------
  // Compiler Configuration
  // ----------------------------------
  compiler_css_modules     : true,
  compiler_devtool         : 'source-map',
  compiler_hash_type       : 'hash',
  compiler_fail_on_warning : false,
  compiler_quiet           : false,
  compiler_public_path     : '',
  compiler_stats           : {
    chunks : false,
    chunkModules : false,
    colors : true
  },
  compiler_vendor : [
    'es6-shim',
    'es5-shim',
    'es6-promise',
    'babel-polyfill',
    'history',
    'react',
    'react-redux',
    'react-router',
    'react-router-redux',
    'redux'
  ],

  // ----------------------------------
  // Test Configuration
  // ----------------------------------
  coverage_enabled   : !argv.watch,
  coverage_reporters : [
    { type : 'text-summary' },
    { type : 'html', dir : 'coverage' }
  ]
}
if (config.relative_path.toString() === 'true') {
  config.server_path = config.server_url
} else {
  var http = 'http'
  if (config.backend_https) {
    http = 'https'
  }
  var port = ''
  if (config.backend_port !== 80) {
    port = ':' + config.backend_port
  }
  config.server_path = http + '://' + config.backend_host + port + config.backend_base_url
}

/************************************************
-------------------------------------------------

All Internal Configuration Below
Edit at Your Own Risk

-------------------------------------------------
************************************************/

// ------------------------------------
// Environment
// ------------------------------------
// N.B.: globals added here must _also_ be added to .eslintrc
config.globals = {
  'process.env'  : {
    'NODE_ENV' : JSON.stringify(config.env)
  },
  'NODE_ENV'         : config.env,
  '__DEV__'          : config.env === 'development' || 'local',
  '__PROD__'         : config.env === 'production',
  '__TEST__'         : config.env === 'test',
  '__BASENAME__'     : JSON.stringify(process.env.BASENAME || ''),
  '__SERVER_PATH__'  : JSON.stringify(config.server_path)
}

// ------------------------------------
// Validate Vendor Dependencies
// ------------------------------------
const pkg = require('../package.json')

config.compiler_vendor = config.compiler_vendor
  .filter(dep => {
    if (pkg.dependencies[dep]) return true

    debug(
      `Package "${dep}" was not found as an npm dependency in package.json; ` +
      `it won't be included in the webpack vendor bundle.
       Consider removing it from vendor_dependencies in ~/config/index.js`
    )
  })

// ------------------------------------
// Utilities
// ------------------------------------
config.utils_paths = (() => {
  const resolve = path.resolve

  const base = (...args) =>
    resolve.apply(resolve, [config.path_base, ...args])

  return {
    base   : base,
    client : base.bind(null, config.dir_client),
    dist   : base.bind(null, config.dir_dist)
  }
})()

export default config
