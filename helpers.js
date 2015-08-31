// Helper methods
var clone   = require('lodash.clone');
var assign  = require('lodash.assign');

/**
 * Helper method for setting input options for IGetPriceHistory interface
 *
 * `item` - The item - this can be a name or a definition index.
 * `quality` - The quality - this can be a name or a definition index.
 * `tradable` - The item's tradability. Use Tradable or 1 to signify that the item should be tradable, or Non-Tradable or 0 to signify that the item should not be tradable. Default: Tradable
 * `craftable` - The item's craftability. Use Craftable or 1 to signify that the item should be craftable, or Non-Craftable or 0 to signify that the item should not be craftable. Default: Craftable
 * `priceindex` - The item's priceindex. Refer to the IGetPrices documentation. Default: 0
 */
module.exports.getPriceHistoryOptions = function(options) {
  if (typeof options.item === 'undefined') {
    throw new Error('Expecting a value for item: an item name as a string or an item definition index as an integer');
  }
  options.quality = options.quality || '';
  options.tradable = options.tradable || '1';
  options.craftable = options.craftable || '1';
  options.priceindex = options.priceindex || '0';

  return options;
};

/**
 * A wrapper method for lodash's `clone` and `assign` modules.
 * Create a clone of an object, `obj`, then assign properties & values
 * from the `src` parameter object to that clone.
 * By default, creates a deep clone of `obj`.
 * @param obj, the object you want to clone and assign key/value pairs to
 * @param src, the object from which to assign key/value pairs
 * @param options:
 *   * { deep: [Boolean] } to create a deep clone. Default: true.
 */
module.exports.cloneAndAssign = function(obj, src, options) {
  options = (typeof options === 'undefined' ? {} : options);
  var deep = (typeof options.deep === 'undefined' ? true : options.deep);
  var copy = clone(obj, deep);
  return assign(copy, src);
};
