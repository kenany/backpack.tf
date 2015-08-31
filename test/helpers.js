var backpacktf = require('../');
var helpers = require('../helpers.js');
var test = require('tape');
var isPlainObject = require('lodash.isplainobject');

test('getPriceHistoryOptions', function(t) {
  t.plan(3);

  t.throws(function() {
    helpers.getPriceHistoryOptions();
  }, new Error(),
    'Throws error if \'item\' property of the passed-in object is undefined'
  );

  t.ok(
    isPlainObject(helpers.getPriceHistoryOptions({item: 'myItemName'})),
    'Is a plain javascript object'
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
  'Returns an object with these keys & values');

});

test('mutations on basicOptions property', function(t) {
  t.plan(3);

  var b = new backpacktf('blah');
  var initial = { key: 'blah', appid: 440 };

  t.test('basicOptions property stores values for key & appid', function(u) {
    u.plan(1);
    u.deepEqual(
      b.basicOptions,
      initial,
      'initially, it has these keys & values'
    );
  });

  t.test('is not mutated by use of the assign module on a clone', function(u) {
    u.plan(2);

    // make a deep clone of the basicOptions property
    // then, assign new key(s) & value(s) into that clone
    var options = helpers.cloneAndAssign(b.basicOptions, { test: 'asdf'});

    u.deepEqual(
      b.basicOptions,
      initial,
      'after operation, the basicOptions itself is not changed'
    );
    u.deepEqual(
      options,
      { key: 'blah', appid: 440, test: 'asdf' },
      'results in these key/value pairs'
    );
  });

  t.test('using assign on its own mutates basicOptions', function(u) {
    u.plan(1);
    // I'm not testing any application code, but just wanted to demonstrate
    // what was happening before.
    var assign = require('lodash.assign');
    var assignedOptions = assign(b.basicOptions, { test: 'asdf' });
    u.deepEqual(
      b.basicOptions,
      assignedOptions,
      'mutates the original value of basicOptions'
    );
  });

});
