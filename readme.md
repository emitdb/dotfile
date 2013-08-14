[![build status](https://secure.travis-ci.org/emitdb/dotfile.png)](http://travis-ci.org/emitdb/dotfile)
[![deps status](https://david-dm.org/emitdb/dotfile.png)](https://david-dm.org/emitdb/dotfile)

# dotfile

simple way to save and read dotfiles

``` js
var dotfile = require('dotfile')('foo');

dotfile.exists(function (yesno) {
  dotfile.write({a: 1}, function (err) {
    dotfiles.read(function (err, disk) {
      console.log(disk);
    });
  });
});
// outputs {a: 1}
```