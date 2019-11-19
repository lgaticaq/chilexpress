const debug = require('debug')('chilexpress')
const chromium = require('chrome-aws-lambda')
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
  const browser = await chromium.puppeteer.launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath,
    headless: chromium.headless
  })
  const result = await chilexpress(browser, orderId)
  debug('close browser')
  await browser.close()
  return result
}
