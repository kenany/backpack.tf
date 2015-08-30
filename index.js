var jsonist = require('jsonist');
var assign = require('lodash.assign');
var isArray = require('lodash.isarray');
var isString = require('lodash.isstring');
var isFunction = require('lodash.isfunction');
var querystring = require('querystring');

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

backpacktf.prototype.getPrices = function getPrices(options, callback) {
  if (isFunction(options)) {
    callback = options;
    options = this.basicOptions;
  } else {
    options = assign({}, this.basicOptions, options);
  }

  var opts = querystring.stringify(options);

  jsonist.get(ENDPOINT + 'IGetPrices/v4?' + opts, callback);
};

backpacktf.prototype.getPriceHistory = function getPriceHistory(options, callback) {
  if (typeof options.item === 'undefined') {
    callback(new TypeError('Expected a value for item: an item name as a ' +
                       'string or an item definition index as an integer'));
    return;
  }

  var opts = assign({}, this.basicOptions, {
    quality: '',
    tradable: '1',
    craftable: '1',
    priceindex: '0'
  }, options);
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

backpacktf.prototype.getMarketPrices = function getMarketPrices(callback) {
  var opts = this.basicOptions;

  opts = querystring.stringify(opts);

  jsonist.get(ENDPOINT + 'IGetMarketPrices/v1?' + opts, callback);
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
  var opts = assign({}, this.basicOptions, { steamid: user });

  opts = querystring.stringify(opts);

  jsonist.get(ENDPOINT + 'IGetUserListings/v2?' + opts, callback);
};

module.exports = backpacktf;
