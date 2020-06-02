## [3.0.1](https://github.com/lgaticaq/chilexpress/compare/v3.0.0...v3.0.1) (2020-06-02)


### Bug Fixes

* **deps:** update dependency chrome-aws-lambda to v3 ([19dc028](https://github.com/lgaticaq/chilexpress/commit/19dc028ad203a3029e23dbe9871a67d388e1ade5))

# [3.0.0](https://github.com/lgaticaq/chilexpress/compare/v2.0.6...v3.0.0) (2019-11-20)


### Bug Fixes

* **linter:** Fix Arrow function should not return assignment ([a73d689](https://github.com/lgaticaq/chilexpress/commit/a73d689fc50e0003d9c31ab2d3045a36294ef9a6))
* **package:** update cheerio to version 1.0.0-rc.1 ([574c6d4](https://github.com/lgaticaq/chilexpress/commit/574c6d4537807f0fa4294a14c3d8727c0e916500))


### Features

* migrate to puppeteer ([2709bd7](https://github.com/lgaticaq/chilexpress/commit/2709bd7d388385e8398beb93279979ebb542ef37))


### BREAKING CHANGES

* new output data

Before:
```js
chilexpress('111111111111').then(console.log)
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

After:
```js
chilexpress('111111111111').then(console.log);
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

#### 2.0.6 (2017-3-14)

##### Chores

* **package:**
  * Upgrade eslint to v3.17.1 ([2762ab69](https://github.com/lgaticaq/chilexpress/commit/2762ab699d2d3182fe5460e3166f269402ecfde9))
  * Upgrade coveralls to v2.12.0 ([302aa916](https://github.com/lgaticaq/chilexpress/commit/302aa9164ba0b563a776f6caaabc721aadd6ef9f))
  * Upgrade codeclimate-test-reporter to v0.4.1 ([036b2655](https://github.com/lgaticaq/chilexpress/commit/036b26550b6005370bb3c068e706477d7ceb78fa))
  * update nock to version 9.0.9 ([dc11f6f7](https://github.com/lgaticaq/chilexpress/commit/dc11f6f7815dfd2a55fbfd83e3593efcf17bbb16))
  * Update eslint to v3.14.1 ([8ad8317f](https://github.com/lgaticaq/chilexpress/commit/8ad8317fe57db10ccfa42547ba2b29d9a1e93278))
* **yarn:** Update lock ([8a75df8d](https://github.com/lgaticaq/chilexpress/commit/8a75df8d4516520dcf553377a6ca95cdcc6f5dda))
* **travis:** Add cache yarn ([b9befe55](https://github.com/lgaticaq/chilexpress/commit/b9befe55562ad5f3b9944276d78817072633e1a0))

#### 2.0.5 (2016-12-18)

##### Bug Fixes

* **datetime:** Fix timezone ([a7256ee5](https://github.com/lgaticaq/chilexpress/commit/a7256ee5f9d40781e8d383e0a94b4fe1c17aa167))

#### 2.0.4 (2016-12-18)

##### Chores

* **travis:** Update node version ([d1c1b4c5](https://github.com/lgaticaq/chilexpress/commit/d1c1b4c5ffe67174ec1620433ef7fbeded86805c))
* **nvm:** Update node version ([2c1c6325](https://github.com/lgaticaq/chilexpress/commit/2c1c6325eb0b6465640c9cff706e12b9dbc3d6a4))
* **npm:** Update ignore ([ef13b6b7](https://github.com/lgaticaq/chilexpress/commit/ef13b6b7091665bd3e6b2d07a9b7077201cc5854))
* **package:**
  * Add yarn.lock ([5b04a369](https://github.com/lgaticaq/chilexpress/commit/5b04a36924681cbde8722d150dd022942adcc8b1))
  * Update dependencies ([4bfcbd36](https://github.com/lgaticaq/chilexpress/commit/4bfcbd366c955f207957e4ce1f3accb421646bef))
  * Replace request-promise with https ([54f43946](https://github.com/lgaticaq/chilexpress/commit/54f43946e36e72b0c75ef9d6d9d7ae0f332bc7cc))
  * update nock to version 9.0.0 ([9717e425](https://github.com/lgaticaq/chilexpress/commit/9717e42594ec28460499f5287051fe7b8fb4a5b5))
  * update codeclimate-test-reporter to version 0.4.0 ([962cb33c](https://github.com/lgaticaq/chilexpress/commit/962cb33c1318a4e3435a7865419678f330373965))
  * update cheerio to version 0.22.0 ([d8c4c911](https://github.com/lgaticaq/chilexpress/commit/d8c4c9110d25980e005061dcb205cc7d8a2e3465))
* **tests:** Complete tests ([e979d2a0](https://github.com/lgaticaq/chilexpress/commit/e979d2a09ae952511a42f83d1ee9c4e3875f4269))

#### 2.0.3 (2016-8-2)

##### Chores

* **package:**
  * Update dependencies ([626e3ee3](https://github.com/lgaticaq/chilexpress/commit/626e3ee3f5763c4d803504040ad6f0e260d199b3))
  * update mocha to version 3.0.0 ([7c382ab9](https://github.com/lgaticaq/chilexpress/commit/7c382ab9d1bf47d0affc0fd4988a18c252a47c5b))
  * update request-promise to version 4.0.1 ([dd592194](https://github.com/lgaticaq/chilexpress/commit/dd5921944da7ebd9dc1acdd35d73de69b63b2ea3))
  * update eslint to version 3.0.0 ([3b3a6e11](https://github.com/lgaticaq/chilexpress/commit/3b3a6e111892ef8d50cfd014923d0bf88723a7f3))
  * update eslint to version 2.13.0 ([f95b3fd6](https://github.com/lgaticaq/chilexpress/commit/f95b3fd661cdd1e6093d1cb2f16cb6297dfa21f2))
  * update codeclimate-test-reporter to version 0.3.3 ([0266da90](https://github.com/lgaticaq/chilexpress/commit/0266da90488e0d4c0db56cfbd5af752dadb3cb0a))
  * update cheerio to version 0.21.0 ([25357678](https://github.com/lgaticaq/chilexpress/commit/2535767818747b9e107d8038f7960f46d25d3533))
  * update mocha to version 2.5.0 ([9e87feec](https://github.com/lgaticaq/chilexpress/commit/9e87feec417f6e1963e72caede04968bc99767cd))

##### Bug Fixes

* **datetime:** Change timezone to -04:00 ([ec279100](https://github.com/lgaticaq/chilexpress/commit/ec279100b215aade680448f42056219242d3a4f7))
* **package:** Downgrade cheerio to v0.20.0 ([2b99d1e1](https://github.com/lgaticaq/chilexpress/commit/2b99d1e1663670f856569292aea1dcb68bfdc7df))

#### 2.0.2 (2016-05-18)

* Fix encoding ([46a3359](https://github.com/lgaticaq/chilexpress/commit/46a3359))

#### 2.0.1 (2016-05-18)

* Add codeclimate ([8524d46](https://github.com/lgaticaq/chilexpress/commit/8524d46))
* Reverse last changes ([d2e05c3](https://github.com/lgaticaq/chilexpress/commit/d2e05c3))

## 2.0.0 (2016-05-15)

* Refactor ([481ca6e](https://github.com/lgaticaq/chilexpress/commit/481ca6e))
* chore(package): update dependencies ([3effb08](https://github.com/lgaticaq/chilexpress/commit/3effb08))

#### 1.2.1 (2016-01-13)

* Add tonic example ([d9615ee](https://github.com/lgaticaq/chilexpress/commit/d9615ee))
* Update dependencies ([9701fd2](https://github.com/lgaticaq/chilexpress/commit/9701fd2))

### 1.2.0 (2015-12-28)

* Add delivery data ([ffdc7d7](https://github.com/lgaticaq/chilexpress/commit/ffdc7d7))

#### 1.1.1 (2015-12-28)

* Add script prepublish ([c7f3cf1](https://github.com/lgaticaq/chilexpress/commit/c7f3cf1))
* Fix unicode ([e238afa](https://github.com/lgaticaq/chilexpress/commit/e238afa))

### 1.1.0 (2015-12-28)

* Add resume data ([bfc40ba](https://github.com/lgaticaq/chilexpress/commit/bfc40ba))

## 1.0.0 (2015-12-28)

* first commit ([3454a14](https://github.com/lgaticaq/chilexpress/commit/3454a14))
