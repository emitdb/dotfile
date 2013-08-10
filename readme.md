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