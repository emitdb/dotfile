var dotfile = require('../'),
  path = require('path'),
  assert = require('assert');

assert.equal(dotfile._version, require('../package').version);
assert.ok(dotfile._tilde);

var dotfiles = {
  foo_fff0z: dotfile('foo_fff0z'),
  bar_fff0z: dotfile('bar_fff0z'),
  baz_fff0z: dotfile('baz_fff0z', {
    dirname: path.join(dotfile._tilde, 'baz')
  })
};

var cfgs = {
  foo_fff0z: {
    a: [1, 2, 3],
    b: {
      c: {
        d: 'EEE!'
      }
    }
  },
  bar_fff0z: 'I AM A PONEYCORN!'
};

//
// for each dotfile being save
//
['foo_fff0z', 'bar_fff0z'].forEach(function (wat) {
  //
  // make sure there's no left overs
  // this can be cause when exceptions bubble up
  //
  dotfiles[wat].unlink(function (err) {
    //
    // files should not exist right now
    //
    dotfiles[wat].exists(function (yesno) {
      assert.equal(yesno, false);
      //
      // write the dotfile
      //
      dotfiles[wat].write(cfgs[wat], function (err) {
        assert.equal(err, null);
        //
        // read the dotfile
        //
        dotfiles[wat].read(function (err, fromdisk) {
          assert.equal(err, null);
          //
          // make sure what was written and read matches
          //
          assert.deepEqual(cfgs[wat], fromdisk);
          //
          // file should now exist
          //
          dotfiles[wat].exists(function (yesno) {
            assert.ok(yesno);
            //
            // unlink just to keep things tidy (redundant);
            //
            dotfiles[wat].unlink(function (err) {
              assert.ok(!err);
            });
          });
        });
      });
    });
  });
});

//
// this dot file exists to
// assert if the current dirname 
// implementation is working
//
dotfiles.baz_fff0z.exists(function (yn) {
  assert.equal(yn, false);
  assert.equal(path.join(dotfile._tilde, 'baz', '.baz_fff0z.json'), dotfiles.baz_fff0z.filepath);
});

//
// ALL DONE
//
console.log('ok DINOSAURS!');
