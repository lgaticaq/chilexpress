const debug = require('debug')('chilexpress')
const puppeteer = require('puppeteer')
const chilexpress = require('./chilexpress')

/**
 * @typedef {import('./chilexpress').ChilexpressResult} ChilexpressResult
 */
/**
 * @param {number} orderId - Chilexpress tracking id.
 * @returns {Promise<ChilexpressResult>} -
 * @example
 * const result = await chilexpress(orderId)
 */
module.exports = async orderId => {
  const browser = await puppeteer.launch()
  const result = await chilexpress(browser, orderId)
  debug('close browser')
  await browser.close()
  return result
}
