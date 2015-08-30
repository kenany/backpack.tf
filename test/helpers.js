var backpacktf = require('../');
var helpers = require('../helpers.js');
var test = require('tape');
var isPlainObject = require('lodash.isplainobject');

test('setDefaultOptions', function(t) {
  t.plan(2);

  t.ok(
    isPlainObject(helpers.setDefaultOptions('apiKey', 440)),
    "returns a plain object"
  );

  t.deepEqual(
    helpers.setDefaultOptions('apiKey', 440),
    { key: 'apiKey', appid: 440 },
    "returns an object with these keys & values"
  );
});

test('getPriceHistoryOptions', function(t) {
  t.plan(2);

  t.throws(function() {
    helpers.getPriceHistoryOptions();
  }, new Error(),
    "Throws error if 'item' property of the passed-in object is undefined"
  );

  t.deepEqual(helpers.getPriceHistoryOptions({
    item: 'myItemName',
    quality: 'Haunted'
  }), {
    item: 'myItemName',
    quality: 'Haunted',
    tradable: '1',
    craftable: '1',
    priceindex: '0'
  },
  "returns an object with these keys & values");

});
