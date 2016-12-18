'use strict';

const path = require('path');

const expect = require('chai').expect;
const nock = require('nock');

const lib = require('../src');

describe('chilexpress', () => {

  describe('valid order id', () => {
    beforeEach(() => {
      nock.disableNetConnect();
      nock('https://www.chilexpress.cl')
        .get('/Views/ChilexpressCL/Resultado-busqueda.aspx')
        .query({DATA: '111111111111'})
        .replyWithFile(200, path.join(__dirname, 'valid.html'));
    });

    it('should return a array statuses', done => {
      lib('111111111111').then(data => {
        expect(data).to.be.a('object');
        expect(data).to.include.keys('orderId', 'product', 'service', 'status', 'isDeliveried', 'history');
        for (let history of data.history) {
          expect(history).to.include.keys('datetime', 'activity');
          expect(history.datetime).to.be.a('date');
          expect(history.activity).to.be.a('string');
        }
        done();
      }).catch(err => {
        expect(err).to.be.null;
        done();
      });
    });
  });

  describe('valid order id with delivery', () => {
    beforeEach(() => {
      nock.disableNetConnect();
      nock('https://www.chilexpress.cl')
        .get('/Views/ChilexpressCL/Resultado-busqueda.aspx')
        .query({DATA: '111111111111'})
        .replyWithFile(200, path.join(__dirname, 'delivery.html'));
    });

    it('should return a array statuses', done => {
      lib('111111111111').then(data => {
        expect(data).to.be.a('object');
        expect(data).to.include.keys('orderId', 'product', 'service', 'status', 'isDeliveried', 'history');
        for (let history of data.history) {
          expect(history).to.include.keys('datetime', 'activity');
          expect(history.datetime).to.be.a('date');
          expect(history.activity).to.be.a('string');
        }
        done();
      }).catch(err => {
        expect(err).to.be.null;
        done();
      });
    });
  });

  describe('invalid order id', () => {
    beforeEach(() => {
      nock.disableNetConnect();
      nock('https://www.chilexpress.cl')
        .get('/Views/ChilexpressCL/Resultado-busqueda.aspx')
        .query({DATA: '1'})
        .replyWithFile(200, path.join(__dirname, 'invalid.html'));
    });

    it('should return an error', done => {
      lib('1').then((data) => {
        expect(data).to.be.undefined;
        done();
      }).catch(err => {
        expect(err).to.eql(new Error('Not found order id'));
        done();
      });
    });
  });

  describe('server error', () => {
    beforeEach(() => {
      nock.disableNetConnect();
      nock('https://www.chilexpress.cl')
        .get('/Views/ChilexpressCL/Resultado-busqueda.aspx')
        .query({DATA: '1'})
        .replyWithError('Server error');
    });

    it('should return an error', done => {
      lib('1').catch(err => {
        expect(err).to.be.an('error');
        done();
      });
    });
  });

  describe('bad status code', () => {
    beforeEach(() => {
      nock.disableNetConnect();
      nock('https://www.chilexpress.cl')
        .get('/Views/ChilexpressCL/Resultado-busqueda.aspx')
        .query({DATA: '1'})
        .reply(301);
    });

    it('should return an error', done => {
      lib('1').catch(err => {
        expect(err).to.be.an('error');
        done();
      });
    });
  });
});
