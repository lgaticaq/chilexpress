# chilexpress

[![npm version](https://img.shields.io/npm/v/chilexpress.svg?style=flat-square)](https://www.npmjs.com/package/chilexpress)
[![npm downloads](https://img.shields.io/npm/dm/chilexpress.svg?style=flat-square)](https://www.npmjs.com/package/chilexpress)
[![Build Status](https://img.shields.io/travis/lgaticaq/chilexpress.svg?style=flat-square)](https://travis-ci.org/lgaticaq/chilexpress)
[![dependency Status](https://img.shields.io/david/lgaticaq/chilexpress.svg?style=flat-square)](https://david-dm.org/lgaticaq/chilexpress#info=dependencies)
[![devDependency Status](https://img.shields.io/david/dev/lgaticaq/chilexpress.svg?style=flat-square)](https://david-dm.org/lgaticaq/chilexpress#info=devDependencies)
[![Join the chat at https://gitter.im/lgaticaq/chilexpress](https://img.shields.io/badge/gitter-join%20chat%20%E2%86%92-brightgreen.svg?style=flat-square)](https://gitter.im/lgaticaq/chilexpress?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

Check shipping status in chilexpress

## Installation

```bash
npm i -S chilexpress
```

## Use

```js
import chilexpress from 'chilexpress';

const orderId = '111111111111';

// Promise
chilexpress(orderId)
  .then(data => console.log(data)) // {orderId: '111111111111', product: 'Encomienda', service: 'Dia Habil Siguiente', status: 'En Proceso De Despacho', isDeliveried: false, history: [{datetime: Mon Dec 28 2015 11:31:00 GMT+0000 (UTC), activity: 'En Proceso De Despacho'}, ...]}
  .fail(err => console.error(err)); // [Error: Not found order id]

// Callback
chilexpress(orderId, (err, data) => {
  if (err) return console.error(err); // [Error: Not found order id]
  console.log(data); // {orderId: '111111111111', product: 'Encomienda', service: 'Dia Habil Siguiente', status: 'En Proceso De Despacho', isDeliveried: false, history: [{datetime: Mon Dec 28 2015 11:31:00 GMT+0000 (UTC), activity: 'En Proceso De Despacho'}, ...]}
});
```
