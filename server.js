/* jshint node: true */
/* global __dirname */

'use strict';

var PORT = 8080;

var _express = require('express');
var _fs = require('fs');
var _http = require('http');
var _proxy = require('http-proxy');
var _url = require('url');

var _app = _express();

var _apiUrl = 'https://blissful-cell-141318.appspot.com/api/';
var _serveDir = '/www';
var _server;
var _port;

var _proxyOptions = {
  changeOrigin: true,
  ignorePath: true,
  secure: false
};

// start the application
_proxy = _proxy.createProxyServer(_proxyOptions);
_port = PORT;
bootstrap();

// request static assets
_app.use('/build', _express.static(__dirname + _serveDir + '/build'));

// proxy api requests
_app.use(apiProxy());

// all other requests return index.html
_app.all('/*', sendIndex);

function apiProxy() {
  return proxyRequest;

  function proxyRequest(req, res, next) {
    var url = _url.parse(req.url), path, target;

    if (shouldProxyRequest(url.path)) {
      path = getPath(url.path);
      target = _apiUrl;

      if (!isOauthRequest(path)) {
        target += '/secure/';
      }
      target += path;

      _proxy.web(req, res, {target: target});
    } else {
      next();
    }
  }

  function isOauthRequest(path) {
    console.log(path);
    return path.toString().indexOf('oauth/token') > -1;
  }

  function getPath(path) {
    return path.toString().replace(/^\/api\//, '');
  }

  function shouldProxyRequest(url) {
    return new RegExp('^\/api\/').test(url);
  }
}

function bootstrap() {
  _server = _http.createServer(_app).listen(_port);
  _server.timeout = 0;
  console.log('listening on port ' + _port);
}

function sendIndex(req, res, next) {
  res.sendFile(_serveDir + '/index.html', {root: __dirname});
}
