var jsonist = require('jsonist');
var isArray = require('lodash.isarray');
var isString = require('lodash.isstring');
var isFunction = require('lodash.isfunction');
var querystring = require('querystring');

var helpers = require('./helpers');

var ENDPOINT = 'http://backpack.tf/api/';

function backpacktf(apiKey, app) {
  if (!(this instanceof backpacktf)) {
    return new backpacktf(apiKey, app);
  }

  if (!isString(apiKey)) {
    throw new TypeError('Expected `apiKey` to be a String');
  }

  this.basicOptions = {
    key: apiKey,
    appid: app || 440
  };
}

/* Community Pricing APIs */

backpacktf.prototype.getPrices = function getPrices(options, callback) {
  if (isFunction(options)) {
    callback = options;
    options = this.basicOptions;
  } else {
    options = helpers.cloneAndAssign(this.basicOptions, options);
  }

  var opts = querystring.stringify(options);

  jsonist.get(ENDPOINT + 'IGetPrices/v4?' + opts, callback);
};

backpacktf.prototype.getPriceHistory = function getPriceHistory(options, callback) {
  var opts = this.basicOptions;

  opts = helpers.cloneAndAssign(opts, helpers.getPriceHistoryOptions(options));
  opts = querystring.stringify(opts);

  jsonist.get(ENDPOINT + 'IGetPriceHistory/v1?' + opts, callback);
};

backpacktf.prototype.getCurrencies = function getCurrencies(callback) {
  var opts = this.basicOptions;

  opts = querystring.stringify(opts);

  jsonist.get(ENDPOINT + 'IGetPriceHistory/v1?' + opts, callback);
};

backpacktf.prototype.getCurrencies = function getCurrencies(callback) {
  var opts = this.basicOptions;

  opts = querystring.stringify(opts);

  jsonist.get(ENDPOINT + 'IGetCurrencies/v1?' + opts, callback);
};

backpacktf.prototype.getSpecialItems = function getSpecialItems(callback) {
  var opts = this.basicOptions;

  opts = querystring.stringify(opts);

  jsonist.get(ENDPOINT + 'IGetSpecialItems/v1?' + opts, callback);
};

/* Developer-friendly APIs for the Steam Community Market */

backpacktf.prototype.getMarketPrices = function getMarketPrices(callback) {
  var opts = this.basicOptions;

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
  var opts = helpers.cloneAndAssign(this.basicOptions, { steamid: user });

  opts = querystring.stringify(opts);

  jsonist.get(ENDPOINT + 'IGetUserListings/v2?' + opts, callback);
};

module.exports = backpacktf;
