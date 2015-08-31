var backpacktf = require('../');
var test = require('tape');
var isFunction = require('lodash.isfunction');
var isPlainObject = require('lodash.isplainobject');
var nock = require('nock');

var api = nock('http://backpack.tf');

test('exports a function', function(t) {
  t.plan(1);
  t.ok(isFunction(backpacktf));
});

test('throws when given no api key', function(t) {
  t.plan(1);

  t.throws(function() {
    backpacktf();
  }, new TypeError('Expected `apiKey` to be a String'));
});

test('throws when api key is not a string', function(t) {
  t.plan(1);

  t.throws(function() {
    backpacktf(440);
  }, new TypeError('Expected `apiKey` to be a String'));
});

test('getPrices', function(t) {
  t.plan(7);

  api.get('/api/IGetPrices/v4?key=blah&appid=440')
    .reply(200, require('./fixtures/prices.json'));

  api.get('/api/IGetPrices/v4?key=blah&appid=440&raw=2')
    .reply(200, require('./fixtures/prices_raw.json'));

  var b = new backpacktf('blah');

  t.ok(isFunction(b.getPrices));

  b.getPrices(function(error, data) {
    t.error(error);
    t.ok(isPlainObject(data));
    t.deepEqual(data, require('./fixtures/prices.json'));
  });

  b.getPrices({raw: 2}, function(error, data) {
    t.error(error);
    t.ok(isPlainObject(data));
    t.deepEqual(data, require('./fixtures/prices_raw.json'));
  });
});

test('getPriceHistory', function(t) {
  t.plan(4);

  api.get('/api/IGetPriceHistory/v1?key=blah&appid=440&item=Dalokohs%20Bar&quality=Strange&tradable=1&craftable=1&priceindex=0')
    .reply(200, require('./fixtures/price_history.json'));

  var b = new backpacktf('blah');

  // At least specify an item and a quality
  var options = {
    item: 'Dalokohs Bar',
    quality: 'Strange'
  };

  t.ok(isFunction(b.getPriceHistory));

  b.getPriceHistory(options, function(error, data) {
    t.error(error);
    t.ok(isPlainObject(data));
    t.deepEqual(data, require('./fixtures/price_history.json'));
  });

});

test('getCurrencies', function(t) {
  t.plan(4);

  api.get('/api/IGetCurrencies/v1?key=blah&appid=440')
    .reply(200, require('./fixtures/currencies.json'));

  var b = new backpacktf('blah');

  t.ok(isFunction(b.getCurrencies));

  b.getCurrencies(function(error, data) {
    t.error(error);
    t.ok(isPlainObject(data));
    t.deepEqual(data, require('./fixtures/currencies.json'));
  });
});

test('getSpecialItems', function(t) {
  t.plan(4);

  api.get('/api/IGetSpecialItems/v1?key=blah&appid=440')
    .reply(200, require('./fixtures/items.json'));

  var b = new backpacktf('blah');

  t.ok(isFunction(b.getSpecialItems));

  b.getSpecialItems(function(error, data) {
    t.error(error);
    t.ok(isPlainObject(data));
    t.deepEqual(data, require('./fixtures/items.json'));
  });
});

test('getMarketPrices', function(t) {
  t.plan(4);

  api.get('/api/IGetMarketPrices/v1?key=blah&appid=440')
    .reply(200, require('./fixtures/market_prices.json'));

  var b = new backpacktf('blah');

  t.ok(isFunction(b.getMarketPrices));

  b.getMarketPrices(function(error, data) {
    t.error(error);
    t.ok(isPlainObject(data));
    t.deepEqual(data, require('./fixtures/market_prices.json'));
  });
});

test('getUsers', function(t) {
  t.plan(7);

  api.get('/api/IGetUsers/v3?steamids=76561198012598620')
    .reply(200, require('./fixtures/users.json'));

  api.get('/api/IGetUsers/v3?steamids=76561198012598620%2C76561197960279927')
    .reply(200, require('./fixtures/users2.json'));

  var b = new backpacktf('blah');

  t.ok(isFunction(b.getUsers));

  b.getUsers('76561198012598620', function(error, data) {
    t.error(error);
    t.ok(isPlainObject(data));
    t.deepEqual(data, require('./fixtures/users.json'));
  });

  b.getUsers(['76561198012598620', '76561197960279927'], function(error, data) {
    t.error(error);
    t.ok(isPlainObject(data));
    t.deepEqual(data, require('./fixtures/users2.json'));
  });
});

test('getUserListings', function(t) {
  t.plan(4);

  api.get('/api/IGetUserListings/v2?key=blah&appid=440&steamid=76561198049406480')
    .reply(200, require('./fixtures/listings.json'));

  var b = new backpacktf('blah');

  t.ok(isFunction(b.getUserListings));

  b.getUserListings('76561198049406480', function(error, data) {
    t.error(error);
    t.ok(isPlainObject(data));
    t.deepEqual(data, require('./fixtures/listings.json'));
  });
});
