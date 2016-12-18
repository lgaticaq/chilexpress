'use strict';

const https = require('https');
const cheerio = require('cheerio');

module.exports = orderId => {
  return new Promise((resolve, reject) => {
    const url = `https://www.chilexpress.cl/Views/ChilexpressCL/Resultado-busqueda.aspx?DATA=${orderId}`;
    https.get(url, res => {
      if (res.statusCode !== 200) {
        res.resume();
        reject(new Error(`Request Failed. Status Code: ${res.statusCode}`));
      } else {
        res.setEncoding('utf8');
        let rawData = '';
        res.on('data', chunk => rawData += chunk);
        res.on('end', () => {
          try {
            const $ = cheerio.load(rawData, {decodeEntities: false});
            const tbl = $('.addresses > tbody').get().map(row => {
              return $(row).find('td').get().map(cell => $(cell).html());
            });
            if (tbl.length === 0) throw new Error('Not found order id');
            const resume = $('.wigdet-content > ul > li > ul > li').get().map(i => {
              const h = $(i);
              h.find('strong').remove();
              return h.html();
            });
            const data = {
              orderId: resume[0],
              product: resume[1],
              service: resume[2],
              status: resume[3],
              isDeliveried: false
            };
            const pattern = /(\d{2})\/(\d{2})\/(\d{4})(\d{2})\:(\d{2})/;
            const downloadHead = $('h4:contains("Datos de Descarga")');
            if (downloadHead.length > 0) {
              const download = downloadHead.parents('.wigdet-content').find('ul > li > ul > li').get().map(i => {
                const h = $(i);
                h.find('strong').remove();
                h.find('a').remove();
                return h.html().replace('&nbsp;', '').replace('()', '').trim();
              });
              data.receptor = {rut: download[0], name: download[3]};
              const dst = `${download[1]}${download[2]}`;
              data.delivery = new Date(dst.replace(pattern,'$3-$2-$1T$4:$5:00-04:00'));
              data.isDeliveried = true;
            }
            data.history = tbl.map(x => {
              const st = `${x[0]}${x[1]}`;
              return {
                datetime: new Date(st.replace(pattern,'$3-$2-$1T$4:$5:00-04:00')),
                activity: x[2]
              };
            });
            resolve(data);
          } catch (err) {
            reject(err);
          }
        });
      }
    }).on('error', err => reject(err));
  });
};
