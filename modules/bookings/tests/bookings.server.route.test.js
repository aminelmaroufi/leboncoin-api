/* eslint linebreak-style: ["error", "unix"] */
/* eslint-env node, mocha */
/* eslint-disable prefer-template */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-shadow */

const chai = require('chai');
const requestSupertest = require('supertest');
const target = require('../../../test/init/target');
const data = require('../../../test/init/data.init');

const { lebonFilter } = data;

const request = requestSupertest(target.host);
const { expect } = chai;

describe('/GET leboncoin API', () => {
  it('Should be able to get specific offers', (done) => {
    request
      .get(`/api/v1/leboncoin/bookings?${lebonFilter.q}`)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.ok).to.be.true;
        expect(res.body.result.bookings.length).to.equal(res.body.result.total);
        return done();
      });
  });
});
