// Helper methods for setting function options

/**
 * Set API key and appID
 */
var setDefaultOptions = function (apiKey, app) {
  return {
    key: apiKey,
    appid: app
  };
};

/**
 * Helper method for setting input options for IGetPriceHistory interface
 *
 * `item` - The item - this can be a name or a definition index.
 * `quality` - The quality - this can be a name or a definition index.
 * `tradable` - The item's tradability. Use Tradable or 1 to signify that the item should be tradable, or Non-Tradable or 0 to signify that the item should not be tradable. Default: Tradable
 * `craftable` - The item's craftability. Use Craftable or 1 to signify that the item should be craftable, or Non-Craftable or 0 to signify that the item should not be craftable. Default: Craftable
 * `priceindex` - The item's priceindex. Refer to the IGetPrices documentation. Default: 0
 */
var getPriceHistoryOptions = function(options) {
  if (typeof options.item === 'undefined') {
    throw new Error("Expecting a value for item: an item name as a string or an item definition index as an integer");
  }
  options.quality = options.quality || '';
  options.tradable = options.tradable || '1';
  options.craftable = options.craftable || '1';
  options.priceindex = options.priceindex || '0';

  return options;
};

module.exports = {
  setDefaultOptions: setDefaultOptions,
  getPriceHistoryOptions: getPriceHistoryOptions
};
