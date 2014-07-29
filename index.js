var jsonist = require('jsonist');
var isArray = require('lodash.isarray');
var isString = require('lodash.isstring');
var querystring = require('querystring');

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

backpacktf.prototype.getPrices = function getPrices(callback) {
  var opts = {
    key: this.apiKey,
    appid: this.app
  };

  opts = querystring.stringify(opts);

  jsonist.get(ENDPOINT + 'IGetPrices/v4?' + opts, callback);
};

backpacktf.prototype.getCurrencies = function getCurrencies(callback) {
  var opts = {
    key: this.apiKey,
    appid: this.app
  };

  opts = querystring.stringify(opts);

  jsonist.get(ENDPOINT + 'IGetCurrencies/v1?' + opts, callback);
};

backpacktf.prototype.getSpecialItems = function getSpecialItems(callback) {
  var opts = {
    key: this.apiKey,
    appid: this.app
  };

  opts = querystring.stringify(opts);

  jsonist.get(ENDPOINT + 'IGetSpecialItems/v1?' + opts, callback);
};

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

  jsonist.get(ENDPOINT + 'IGetUserListings/v1?' + opts, callback);
};

module.exports = backpacktf;