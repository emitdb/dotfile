var fs = require('fs'),
  path = require('path');

/**
 * Class to easily manage dot files
 *
 * @param {String} basename What to name this dotfile
 *
 * @author dscape
 */

function Dotfile(basename, options) {
  this.basename = basename;
  this.extname = (options && typeof options.extname === 'string') ? options.extname : '.json';
  this.dirname = (options && typeof options.dirname === 'string') ? options.dirname : Dotfile._tilde;
  this.filepath = path.join(this.dirname, '.' + this.basename + this.extname);
}

/**
 * Writes data to the dotfile
 *
 * @param {Object} data The document to write
 */

Dotfile.prototype.write = function (data, cb) {
  return fs.writeFile(this.filepath, JSON.stringify(data), {
    encoding: 'utf-8'
  }, cb);
};

/**
 * Reads data to the dotfile
 *
 * @param {Object} data The document to read
 */

Dotfile.prototype.read = function (cb) {
  return fs.readFile(this.filepath, {
    encoding: 'utf-8'
  }, function (err, data) {
    if (err) {
      return cb(err);
    }
    try {
      data = JSON.parse(data);
    } catch (exc) {
      return cb(exc);
    }
    return cb(null, data);
  });
};

/**
 * Deletes the dotfile from disk
 */

Dotfile.prototype.unlink = function (cb) {
  return fs.unlink(this.filepath, cb);
};

/**
 * Checks if a specific dotfile already exists
 */
Dotfile.prototype.exists = function (cb) {
  return fs.exists(this.filepath, cb);
};

Dotfile._tilde = process.env[(process.platform === 'win32') ? 'USERPROFILE' : 'HOME'];
Dotfile._id = function id(val) {
  return val;
};

module.exports = function (filename, options) {
  return new Dotfile(filename, options);
};
module.exports._version = require('./package').version;
module.exports._tilde = Dotfile._tilde;
