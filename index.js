var jsonist = require('jsonist');
var isArray = require('lodash.isarray');
var isString = require('lodash.isstring');
var isFunction = require('lodash.isfunction');
var assign = require('lodash.assign');
var querystring = require('querystring');

var helpers = require('./helpers.js');

var ENDPOINT = 'http://backpack.tf/api/';

function backpacktf(apiKey, app) {
  if (!(this instanceof backpacktf)) {
    return new backpacktf(apiKey, app);
  }

  if (!isString(apiKey)) {
    throw new TypeError('Expected `apiKey` to be a String');
  }

  this.apiKey = apiKey;
  this.app = app || 440;
}

/* Community Pricing APIs */

backpacktf.prototype.getPrices = function getPrices(options, callback) {
  if (isFunction(options)) {
    callback = options;
    options = {
      key: this.apiKey,
      appid: this.app
    };
  } else {
    options.key = this.apiKey;
    options.appid = this.app;
  }

  var opts = querystring.stringify(options);

  jsonist.get(ENDPOINT + 'IGetPrices/v4?' + opts, callback);
};

backpacktf.prototype.getPriceHistory = function getPriceHistory(options, callback) {
  //var opts = {
  //  key: this.apiKey,
  //  appid: this.app,
  //};
  var opts = helpers.setDefaultOptions(this.apiKey, this.app);

  opts = assign(opts, helpers.getPriceHistoryOptions(options));
  opts = querystring.stringify(opts);

  jsonist.get(ENDPOINT + 'IGetPriceHistory/v1?' + opts, callback);
};

backpacktf.prototype.getCurrencies = function getCurrencies(callback) {
  //var opts = {
  //  key: this.apiKey,
  //  appid: this.app
  //};
  var opts = helpers.setDefaultOptions(this.apiKey, this.app);

  opts = assign(opts, helpers.getPriceHistoryOptions(options));
  opts = querystring.stringify(opts);

  jsonist.get(ENDPOINT + 'IGetPriceHistory/v1?' + opts, callback);
};

backpacktf.prototype.getCurrencies = function getCurrencies(callback) {
  //var opts = {
  //  key: this.apiKey,
  //  appid: this.app
  //};
  var opts = helpers.setDefaultOptions(this.apiKey, this.app);

  opts = querystring.stringify(opts);

  jsonist.get(ENDPOINT + 'IGetCurrencies/v1?' + opts, callback);
};

backpacktf.prototype.getSpecialItems = function getSpecialItems(callback) {
  //var opts = {
  //  key: this.apiKey,
  //  appid: this.app
  //};
  var opts = helpers.setDefaultOptions(this.apiKey, this.app);

  opts = querystring.stringify(opts);

  jsonist.get(ENDPOINT + 'IGetSpecialItems/v1?' + opts, callback);
};

/* Developer-friendly APIs for the Steam Community Market */

backpacktf.prototype.getMarketPrices = function getMarketPrices(callback) {
  //var opts = {
  //  key: this.apiKey,
  //  appid: this.app
  //};
  var opts = helpers.setDefaultOptions(this.apiKey, this.app);

  opts = querystring.stringify(opts);

  jsonist.get(ENDPOINT + 'IGetMarketPrices/v1?' + opts, callback);
};

/* APIs for other services & data provided by backpack.tf */

backpacktf.prototype.getUsers = function getUsers(users, callback) {
  var opts = {
    steamids: users
  };

  if (isArray(users)) {
    opts.steamids = opts.steamids.join(',');
  }

  opts = querystring.stringify(opts);

  jsonist.get(ENDPOINT + 'IGetUsers/v3?' + opts, callback);
};

backpacktf.prototype.getUserListings = function getUserListings(user, callback) {
  var opts = {
    key: this.apiKey,
    appid: this.app,
    steamid: user
  };

  opts = querystring.stringify(opts);

  // TODO: update the interface for version 2
  jsonist.get(ENDPOINT + 'IGetUserListings/v1?' + opts, callback);
};

module.exports = backpacktf;
