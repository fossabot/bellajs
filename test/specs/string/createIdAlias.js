/**
 * Testing
 * @ndaidong
 */
/* global describe it */
/* eslint no-undefined: 0*/
/* eslint no-array-constructor: 0*/
/* eslint no-new-func: 0*/

import path from 'path';
import chai from 'chai';

chai.should();
var expect = chai.expect;

var rootDir = '../../../src/';

var bella = require(path.join(rootDir, 'bella'));

describe('.createAlias(String s)', () => {

  describe(' / bella.createAlias("Sur l\'année 2015")', () => {

    let alias = bella.createAlias('Sur l\'année 2015');
    it(' should generate a standard slug', () => {
      expect(alias).to.equal('sur-l-annee-2015');
    });

    it(' should contain only alphabet, 0-9 and -', () => {
      expect(alias).to.match(/^[0-9a-z-]+/);
    });

  });

  describe(' / bella.createAlias("")', () => {

    let alias = bella.createAlias('');
    it(' should generate an empty string', () => {
      expect(alias).to.equal('');
    });

  });

  describe(' / bella.createAlias(123456)', () => {

    let alias = bella.createAlias(123456);
    it(' should return "123456"', () => {
      expect(alias).to.equal('123456');
    });

  });
});

