'use strict';

import https from 'https';
import cheerio from 'cheerio';
import Q from 'q';

export default (orderId, callback) => {
  const deferred = Q.defer();

  https.get(`https://www.chilexpress.cl/Views/ChilexpressCL/Resultado-busqueda.aspx?DATA=${orderId}`, (response) => {
    let body = '';

    response.on('data', (chunk) => body += chunk);

    response.on('end', () => {
      const $ = cheerio.load(body);
      const tbl = $('.addresses > tbody').get().map(row => {
        return $(row).find('td').get().map(cell => $(cell).html());
      });
      if (tbl.length === 0) {
        deferred.reject(new Error('Not found order id'));
      } else {
        const resume = $('.wigdet-content > ul > li > ul > li').get().map(i => {
          const h = $(i);
          h.find('strong').remove();
          return h.html();
        });
        const data = {
          orderId: resume[0],
          product: resume[1],
          service: resume[2],
          status: resume[3]
        };
        const pattern = /(\d{2})\/(\d{2})\/(\d{4})(\d{2})\:(\d{2})/;
        data.history = tbl.map(x => {
          const st = `${x[0]}${x[1]}`;
          return {
            datetime: new Date(st.replace(pattern,'$3-$2-$1T$4:$5-03:00')),
            activity: x[2]
          };
        });
        deferred.resolve(data);
      }
    });
  }).on('error', (err) => deferred.reject(err));

  deferred.promise.nodeify(callback);

  return deferred.promise;
};
