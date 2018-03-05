import Koa from 'koa';
import webpack from 'webpack';
import webpackConfig from '../build/webpack.config';

const app = new Koa();

// ------------------------------------
// Apply Webpack HMR Middleware
// ------------------------------------
const compiler = webpack(webpackConfig);
const { publicPath } = webpackConfig.output;
app.use(require('./middleware/webpack-dev')(compiler, publicPath));
app.use(require('./middleware/webpack-hmr')(compiler));

export default app;
