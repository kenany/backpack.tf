var helpers = require('../helpers.js');
var test = require('tape');
var isPlainObject = require('lodash.isplainobject');

test('getPriceHistoryOptions', function(t) {
  t.plan(3);

  t.throws(function() {
    helpers.getPriceHistoryOptions();
  }, new Error(),
    "Throws error if 'item' property of the passed-in object is undefined"
  );

  t.ok(
    isPlainObject(helpers.getPriceHistoryOptions({item: 'myItemName'})),
    "Is a plain javascript object"
  );

  t.deepEqual(helpers.getPriceHistoryOptions({
    item: 'myItemName',
    quality: 'Haunted'
  }), {
    item: 'myItemName',
    quality: 'Haunted',
    tradable: '1',
    craftable: '1',
    priceindex: '0',
  },
  "Returns an object with these keys & values");

});
