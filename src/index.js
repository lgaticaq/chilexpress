'use strict';

const rp = require('request-promise');
const cheerio = require('cheerio');
const moment = require('moment');

module.exports = orderId => {
  const options = {
    url: 'https://www.chilexpress.cl/Views/ChilexpressCL/Resultado-busqueda.aspx',
    qs: {DATA: orderId},
    json: true,
    rejectUnauthorized: false,
    transform: cheerio.load
  };
  const data = {orderId: orderId};
  return rp(options).then($ => {
    const resume = $('#ListaOTHijas > tr:nth-child(1) td').get().map(i => $(i).text());
    if (resume.length === 0) throw new Error('Not found order id');
    data.transportId = resume[0];
    data.status = resume[1];
    data.delivery = {
      name: resume[2],
      datetime: moment(`${resume[3]} -03:00`, 'DD/MM/YYYY HH:mm ZZ').toDate()
    };
    data.isDeliveried = resume[1] === 'DESCARGADA';
    data.receptor = {rut: null, name: null};
    const options = {
      method: 'POST',
      url: 'https://www.chilexpress.cl/Views/ChilexpressCL/Resultado-busqueda.aspx/ObtieneTrakingWEBM',
      body: JSON.stringify({ot: resume[0], Filas: 0, Hoja: 0}),
      rejectUnauthorized: false,
      headers: {
        'Origin': 'https://www.chilexpress.cl',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2734.0 Safari/537.36',
        'Content-Type': 'application/json; charset=UTF-8',
        'Accept': 'application/json, text/javascript, */*; q=0.01',
        'Referer': `https://www.chilexpress.cl/Views/ChilexpressCL/Resultado-busqueda.aspx?DATA=${orderId}`,
        'X-Requested-With': 'XMLHttpRequest',
        'Connection': 'keep-alive'
      },
      transform: body => {
        body = JSON.parse(body);
        return cheerio.load(body.d);
      }
    };
    return rp(options);
  }).then($ => {
    const info = $('.detaLista ol li').get().map(i => $(i).text().trim().split(/:\s+/));
    for (let i of info) {
      if (i[0] === 'Producto') data.product = i[1];
      if (i[0] === 'Servicio') data.service = i[1];
      if (i[0] === 'Rut Receptor') data.receptor.rut = i[1];
      if (i[0] === 'Nombre Receptor') data.receptor.name = i[1];
    }
    data.history = $('.detaLista #ListaTrackingOT').get().map(y => {
      const d = $(y).find('td').get().map(x => $(x).text());
      return {
        datetime: moment(`${d[0]} ${d[1]} -03:00`, 'DD/MM/YYYY HH:mm ZZ').toDate(),
        activity: d[2]
      };
    });
    return data;
  });
};
