# backpack.tf

[![Build Status](https://travis-ci.org/KenanY/backpack.tf.svg)](https://travis-ci.org/KenanY/backpack.tf)
[![Dependency Status](https://gemnasium.com/KenanY/backpack.tf.svg)](https://gemnasium.com/KenanY/backpack.tf)

[backpack.tf](http://backpack.tf/) API wrapper.

## Example

``` javascript
var backpacktf = require('backpack.tf');

var backpack = new backpacktf('api key');

backpack.getUsers('76561198012598620', function(error, data) {
  if (error) {
    throw error;
  }

  console.log(data);
  //=> {
  //=>   "response": {
  //=>     "success": 1,
  //=>     "current_time": 1403708347,
  //=>     "players": {
  //=>       "76561198012598620": {
  //=>         "steamid": "76561198012598620",
  //=>         "success": 1,
  //=>         "backpack_value": {
  //=>           "440": 159.1
  //=>         },
  //=>         "backpack_update": {
  //=>           "440": 1403707942
  //=>         },
  //=>         "name": "Fiskie",
  //=>         "backpack_tf_reputation": 15,
  //=>         "backpack_tf_group": true,
  //=>         "notifications": 0
  //=>       }
  //=>     }
  //=>   }
  //=> }
});
```

## Installation

``` bash
$ npm install backpack.tf
```

## API

``` javascript
var backpacktf = require('backpack.tf');
```

### `var b = new backpacktf(apiKey[, app])`

Creates a backpacktf instance `b` from _String_ `apiKey`. _Number_ `app` is the
AppID of the game you want to be querying prices for (defaults to `440`, Team
Fortress 2).

### `b.getPrices([options={}], callback)`

Queries backpack.tf's price information for all priced items. _Object_ `options`
can be used to set parameters like `raw`.

The callback is called by jsonist with up to 3 arguments:

> If there is an error then there will only be an error argument in the first
> position, otherwise it will be `null`. The second argument will contain the
> deserialised object obtained from the server and the third argument will be
> the response object itself if you need to fetch headers or other metadata.

### `b.getPriceHistory([options={}], callback)`

Queries backpack.tf's price history for a given item.

_Object_ `options` should be used to specify at least two keys:

1. **`item`**, where the value is either:
  * item definition index as an integer OR
  * item name as a string *(recommended)*
1. **`quality`**, the item quality. See [TF2 Schema](https://wiki.teamfortress.com/wiki/WebAPI/GetSchema#Result_Data) for more info.
  * item quality as its definition index OR
  * item quality as a string *(recommended)*. Possible values are:
    * `Normal`
    * `Genuine`
    * `Vintage`
    * `Unusual`
    * `Unique`
    * `Community`
    * `Valve`
    * `Self-Made`
    * `Strange`
    * `Haunted`
    * `Collector's`
  * Returns an empty array if there's nothing found.

As with the `getPrices` function, the callback is called by jsonist with up
to 3 arguments

### `b.getCurrencies(callback)`

Queries backpack.tf's internal currency data for a given game.

### `b.getSpecialItems(callback)`

Queries backpack.tf's internal item placeholders for a given game.

### `b.getMarketPrices(callback)`

Queries for Steam Community Market price information in a readable format.

### `b.getUsers(users, callback)`

Queries backpack.tf's profile information for `users`. If looking up only one
profile, then `users` should be a _String_ containing the profile's 64-bit Steam
ID. If looking up multiple users, then `users` should be an _Array_ of _Strings_
containing the 64-bit Steam IDs of the profiles you want to look up.

### `b.getUserListings(user, callback)`

Queries backpack.tf's classified listings for _String_ `user`.
