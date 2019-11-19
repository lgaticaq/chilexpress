# chilexpress

[![npm version](https://img.shields.io/npm/v/chilexpress.svg?style=flat-square)](https://www.npmjs.com/package/chilexpress)
[![npm downloads](https://img.shields.io/npm/dm/chilexpress.svg?style=flat-square)](https://www.npmjs.com/package/chilexpress)
[![Build Status](https://travis-ci.org/lgaticaq/chilexpress.svg?branch=master)](https://travis-ci.org/lgaticaq/chilexpress)
[![Maintainability](https://api.codeclimate.com/v1/badges/d8aabe323571c8fb5f0e/maintainability)](https://codeclimate.com/github/lgaticaq/chilexpress/maintainability)
[![dependency Status](https://img.shields.io/david/lgaticaq/chilexpress.svg?style=flat-square)](https://david-dm.org/lgaticaq/chilexpress#info=dependencies)
[![devDependency Status](https://img.shields.io/david/dev/lgaticaq/chilexpress.svg?style=flat-square)](https://david-dm.org/lgaticaq/chilexpress#info=devDependencies)

> Check shipping status in chilexpress

## Installation

```bash
npm i -S chilexpress
```

## Use

[Try on Tonic](https://tonicdev.com/npm/chilexpress)
```js
import chilexpress from 'chilexpress';

const orderId = '111111111111';

chilexpress(orderId).then(console.log);
/*
{
  status: 'En Proceso De Despacho',
  delivery: {
    name: 'XXX XXX',
    rut: '0',
    date: Mon Dec 28 2015 11:31:00 GMT+0000 (UTC),
    signature: ''
  },
  history: [
    {
      date: Mon Dec 28 2015 11:31:00 GMT+0000 (UTC),
      activity: 'En Proceso De Despacho'
    }
  ],
  shipping: {
    product: 'Encomienda',
    service: 'Dia Habil Siguiente',
    date: Mon Dec 28 2015 11:31:00 GMT+0000 (UTC)
  }
}
*/
```

## License

[MIT](https://tldrlegal.com/license/mit-license)
