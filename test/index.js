var dotfile = require('../'),
  assert = require('assert');

var dotfiles = {
  foo: dotfile('foo'),
  bar: dotfile('bar')
};

var cfgs = {
  foo: {
    a: [1, 2, 3],
    b: {
      c: {
        d: 'EEE!'
      }
    }
  },
  bar: 'I AM A PONEYCORN!'
};

['foo', 'bar'].forEach(function (wat) {
  dotfiles[wat].exists(function (yesno) {
    assert.equal(yesno, false);
    dotfiles[wat].write(cfgs[wat], function (err) {
      assert.equal(err, null);
      dotfiles[wat].read(function (err, fromdisk) {
        assert.equal(err, null);
        assert.deepEqual(cfgs[wat], fromdisk);
        dotfiles[wat].unlink(function (err) {
          assert.equal(err, null);
          dotfiles[wat].exists(function (yesno) {
            assert.ok(!yesno);
          });
        });
      });
    });
  });
});

console.log('ok');
