# chilexpress

[![npm version](https://img.shields.io/npm/v/chilexpress.svg?style=flat-square)](https://www.npmjs.com/package/chilexpress)
[![npm downloads](https://img.shields.io/npm/dm/chilexpress.svg?style=flat-square)](https://www.npmjs.com/package/chilexpress)
[![Build Status](https://img.shields.io/travis/lgaticaq/chilexpress.svg?style=flat-square)](https://travis-ci.org/lgaticaq/chilexpress)
[![Coverage Status](https://img.shields.io/coveralls/lgaticaq/chilexpress/master.svg?style=flat-square)](https://coveralls.io/github/lgaticaq/chilexpress?branch=master)
[![Code Climate](https://img.shields.io/codeclimate/github/lgaticaq/chilexpress.svg?style=flat-square)](https://codeclimate.com/github/lgaticaq/chilexpress)
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
  orderId: '111111111111',
  product: 'Encomienda', 
  service: 'Dia Habil Siguiente', 
  status: 'En Proceso De Despacho', 
  isDeliveried: false, 
  history: [
    {
      datetime: Mon Dec 28 2015 11:31:00 GMT+0000 (UTC),
      activity: 'En Proceso De Despacho'
    }
  ]
}
*/
```

## License

[MIT](https://tldrlegal.com/license/mit-license)
