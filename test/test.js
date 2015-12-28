'use strict';
/*eslint no-console: 0*/
import path from 'path';

import {expect} from 'chai';
import nock from 'nock';

import lib from '../lib';

describe('chilexpress', () => {


  describe('valid order id', () => {

    const orderId = '111111111111';

    beforeEach(() => {
      nock.disableNetConnect();
      nock('https://www.chilexpress.cl')
        .get('/Views/ChilexpressCL/Resultado-busqueda.aspx')
        .query({DATA: orderId})
        .replyWithFile(200, path.join(__dirname, 'valid.html'));
    });

    it('should return a array statuses (callback)', (done) => {
      lib(orderId, (err, data) => {
        expect(err).to.be.null;
        expect(data).to.be.a('object');
        expect(data).to.include.keys('orderId', 'product', 'service', 'status', 'history');
        expect(data.history[0]).to.include.keys('datetime', 'activity');
        expect(data.history[0].datetime).to.be.a('date');
        expect(data.history[0].activity).to.be.a('string');
        done();
      });
    });

    it('should return a array statuses (promise)', (done) => {
      lib(orderId).then((data) => {
        expect(data).to.be.a('object');
        expect(data).to.include.keys('orderId', 'product', 'service', 'status', 'history');
        expect(data.history[0]).to.include.keys('datetime', 'activity');
        expect(data.history[0].datetime).to.be.a('date');
        expect(data.history[0].activity).to.be.a('string');
        done();
      }).fail((err) => {
        expect(err).to.be.null;
        done();
      });
    });
  });

  describe('invalid order id', () => {

    const orderId = '1';

    beforeEach(() => {
      nock.disableNetConnect();
      nock('https://www.chilexpress.cl')
        .get('/Views/ChilexpressCL/Resultado-busqueda.aspx')
        .query({DATA: orderId})
        .replyWithFile(200, path.join(__dirname, 'invalid.html'));
    });

    it('should return a error (callback)', (done) => {
      lib(orderId, (err, data) => {
        expect(err).to.eql(new Error('Not found order id'));
        expect(data).to.be.undefined;
        done();
      });
    });

    it('should return a error (promise)', (done) => {
      lib(orderId).then((data) => {
        expect(data).to.be.undefined;
        done();
      }).fail((err) => {
        expect(err).to.eql(new Error('Not found order id'));
        done();
      });
    });
  });
});
