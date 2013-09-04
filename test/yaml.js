var dotfile = require('../'),
  path = require('path'),
  assert = require('assert');
var dotfiles = {
  foo_yaml1: dotfile('foo_yaml1', {
    dirname: path.join(process.cwd(),'test/files/'),
    format:'yaml'
  }),
  foo_yaml2: dotfile('foo_yaml2', {
    dirname: path.join(process.cwd(),'test/files/'),
    extname: '',
    format:'yaml'
  })
};

var cfgs = {
  foo_yaml1: {
    a: [1, 2, 3],
    b: {
      c: {
        d: 'EEE!'
      }
    }
  },
  foo_yaml2: {
    a: [1, 2, 3],
    b: {
      c: {
        d: 'EEE!'
      }
    }
  }
};

Object.keys(dotfiles).forEach(function (wat) {
  dotfiles[wat].unlink(function (err) {
    dotfiles[wat].exists(function (yesno) {
      console.log(yesno);
      //assert.equal(yesno, false);
      //
      // write the dotfile
      //
      dotfiles[wat].write(cfgs[wat], function (err) {
        console.log(err)
        //assert.equal(err, null);
        //
        // read the dotfile
        //
      //   dotfiles[wat].read(function (err, fromdisk) {
      //     assert.equal(err, null);
      //     //
      //     // make sure what was written and read matches
      //     //
      //     assert.deepEqual(cfgs[wat], fromdisk);
      //     //
      //     // file should now exist
      //     //
      //     dotfiles[wat].exists(function (yesno) {
      //       assert.ok(yesno);
      //       //
      //       // unlink just to keep things tidy (redundant);
      //       //
      //       dotfiles[wat].unlink(function (err) {
      //         assert.ok(!err);
      //       });
      //     });
      //   });
      });
    });
  });
});