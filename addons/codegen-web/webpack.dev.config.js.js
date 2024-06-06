var _ = require('lodash');
var webpackFunc = require('./webpack.config')

module.exports = _.merge({},webpackFunc('dev'),{
    devtool: 'source-map',
});