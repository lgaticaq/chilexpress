const debug = require('debug')('chilexpress')

/**
 * @typedef {import('puppeteer').Browser} Browser
 */
/**
 * @typedef {Object} ChilexpressDelivery
 * @property {string} name
 * @property {string} rut
 * @property {Date} date
 * @property {string} signature
 */
/**
 * @typedef {Object} ChilexpressHistory
 * @property {Date} date
 * @property {string} activity
 */
/**
 * @typedef {Object} ChilexpressShipping
 * @property {string} product
 * @property {string} service
 * @property {Date} date
 */
/**
 * @typedef {Object} ChilexpressResult
 * @property {string} status
 * @property {ChilexpressDelivery} delivery
 * @property {Array<ChilexpressHistory>} history
 * @property {ChilexpressShipping} shipping
 */
/**
 * @param {Browser} browser - Puppeter browser instance.
 * @param {number} orderId - Chilexpress tracking id.
 * @returns {Promise<ChilexpressResult>} -
 * @example
 * const result = await chilexpress(orderId)
 */
module.exports = async (browser, orderId) => {
  debug('open new page')
  const page = await browser.newPage()

  const navigationPromise = page.waitForNavigation()

  debug(
    'got to https://www.chilexpress.cl/Views/ChilexpressCL/Resultado-busqueda.aspx'
  )
  await page.goto(
    'https://www.chilexpress.cl/Views/ChilexpressCL/Resultado-busqueda.aspx'
  )

  await page.setViewport({ width: 1042, height: 630 })

  debug('wait navigation')
  await navigationPromise

  debug('wait input search')
  await page.waitForSelector('#Cabecera_divContenedorMenu #Cabecera_txtSearch')
  debug(`type order id ${orderId}`)
  await page.type(
    '#Cabecera_divContenedorMenu #Cabecera_txtSearch',
    orderId.toString()
  )
  debug('wait button search')
  await page.waitForSelector(
    '.row > .grid-13 > .form-inline > #Cabecera_btnBuscar > .icon-search'
  )
  debug('click button search')
  await page.click(
    '.row > .grid-13 > .form-inline > #Cabecera_btnBuscar > .icon-search'
  )

  debug('wait content')
  await page.waitForSelector('#busqueda-content')
  const exist = await page.evaluate(() => {
    const header = document.querySelector('#busqueda-content > h2')
    return !header
  })
  debug(`content founded: ${exist}`)
  if (!exist) throw new Error('Order not found')

  debug('wait status content')
  await page.waitForSelector(
    '.seguimiento_grupo > .seguimiento_imagen.seguimiento_verde.seguimiento_paso_actual'
  )
  const status = await page.evaluate(
    () =>
      document
        .querySelector(
          '.seguimiento_grupo > .seguimiento_imagen.seguimiento_verde.seguimiento_paso_actual'
        )
        .parentElement.getElementsByTagName('div')[0].textContent
  )
  debug(`status content: ${status}`)

  debug('wait delivery content')
  await page.waitForSelector('.seccion > .datos_entrega > .contenido_entrega')
  /** @type {ChilexpressDelivery} */
  const delivery = await page.evaluate(() => ({
    name: document
      .querySelector(
        '.seccion > .datos_entrega > .contenido_entrega > .grupo_datos:nth-child(1) > .datos_informacion'
      )
      .textContent.trim(),
    rut: document
      .querySelector(
        '.seccion > .datos_entrega > .contenido_entrega > .grupo_datos:nth-child(2) > .datos_informacion'
      )
      .textContent.trim(),
    date: document
      .querySelector(
        '.seccion > .datos_entrega > .contenido_entrega > .grupo_datos:nth-child(3) > .datos_informacion'
      )
      .textContent.trim()
      .replace(
        /(\d{2})\/(\d{2})\/(\d{4}) - (\d{2}):(\d{2}) hrs\./,
        '$3-$2-$1T$4:$5:00-03:00'
      ),
    signature: document
      .querySelector(
        '.seccion > .datos_entrega > .contenido_entrega > .grupo_datos:nth-child(4) > .datos_informacion'
      )
      .textContent.trim()
  }))
  debug(`delivery content: ${JSON.stringify(delivery)}`)

  debug('wait history content')
  await page.waitForSelector(
    '.datos_seguimiento > .addresses > #ListaTrackingOT'
  )
  /** @type {Array<ChilexpressHistory>} */
  const history = await page.evaluate(() => {
    return Array.from(
      document.querySelectorAll(
        '.datos_seguimiento > .addresses > #ListaTrackingOT > tr'
      ),
      tr => {
        const [date, time, activity] = Array.from(
          tr.querySelectorAll('td'),
          td => td.textContent
        )
        return {
          date: `${date}${time}`.replace(
            /(\d{2})\/(\d{2})\/(\d{4})(\d{2}):(\d{2})/,
            '$3-$2-$1T$4:$5:00-03:00'
          ),
          activity
        }
      }
    )
  })
  debug(`history content: ${JSON.stringify(history)}`)

  debug('wait shipping content')
  await page.waitForSelector('.datos_entrega > .datos_pieza > .contenido_pieza')
  /** @type {ChilexpressShipping} */
  const shipping = await page.evaluate(() => ({
    product: document
      .querySelector(
        '.datos_entrega > .datos_pieza > .contenido_pieza > .grupo_datos:nth-child(1) > .pieza_producto'
      )
      .textContent.trim(),
    service: document
      .querySelector(
        '.datos_entrega > .datos_pieza > .contenido_pieza > .grupo_datos:nth-child(2) > .pieza_producto'
      )
      .textContent.trim(),
    date: document
      .querySelector(
        '.datos_entrega > .datos_pieza > .contenido_pieza > .grupo_datos:nth-child(3) > .pieza_producto'
      )
      .textContent.trim()
      .replace(/(\d{2})\/(\d{2})\/(\d{4})/, '$3-$2-$1T00:00:00-03:00')
  }))
  debug(`shipping content: ${JSON.stringify(shipping)}`)

  delivery.date = new Date(delivery.date)
  history.forEach(data => {
    data.date = new Date(data.date)
  })
  shipping.date = new Date(shipping.date)

  return { status, delivery, history, shipping }
}
