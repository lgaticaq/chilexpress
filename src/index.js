const puppeteer = require('puppeteer')

/**
 * @typedef {Object} ChilexpressDelivery
 * @property {string} name
 * @property {string} rut
 * @property {string} date
 * @property {string} signature
 */
/**
 * @typedef {Object} ChilexpressHistory
 * @property {string} date
 * @property {string} activity
 */
/**
 * @typedef {Object} ChilexpressShipping
 * @property {string} product
 * @property {string} service
 * @property {string} date
 */
/**
 * @typedef {Object} ChilexpressResult
 * @property {string} status
 * @property {ChilexpressDelivery} delivery
 * @property {Array<ChilexpressHistory>} history
 * @property {ChilexpressShipping} shipping
 */
/**
 * @param {number} orderId - Chilexpress tracking id.
 * @returns {ChilexpressResult} -
 * @example
 * const result = await chilexpress(orderId)
 */
module.exports = async orderId => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  const navigationPromise = page.waitForNavigation()

  await page.goto(
    'https://www.chilexpress.cl/Views/ChilexpressCL/Resultado-busqueda.aspx'
  )

  await page.setViewport({ width: 1042, height: 630 })

  await navigationPromise

  // Search order
  await page.waitForSelector('#Cabecera_divContenedorMenu #Cabecera_txtSearch')
  await page.type('#Cabecera_divContenedorMenu #Cabecera_txtSearch', orderId)
  await page.waitForSelector(
    '.row > .grid-13 > .form-inline > #Cabecera_btnBuscar > .icon-search'
  )
  await page.click(
    '.row > .grid-13 > .form-inline > #Cabecera_btnBuscar > .icon-search'
  )

  // Get status content
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

  // Get delivery content
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
        /(\d{2})\/(\d{2})\/(\d{4}) - (\d{2}):(\d{2})/,
        '$3-$2-$1T$4:$5:00-03:00'
      ),
    signature: document
      .querySelector(
        '.seccion > .datos_entrega > .contenido_entrega > .grupo_datos:nth-child(4) > .datos_informacion'
      )
      .textContent.trim()
  }))

  // Get history content
  await page.waitForSelector(
    '.datos_seguimiento > .addresses > #ListaTrackingOT'
  )
  /** @type {ChilexpressHistory} */
  const history = await page.evaluate(() => {
    return Array.from(
      document.querySelectorAll(
        '.datos_seguimiento > .addresses > #ListaTrackingOT > tr'
      )
    ).map(tr => {
      const [date, time, activity] = Array.from(tr.querySelectorAll('td')).map(
        td => td.textContent
      )
      return {
        date: `${date}${time}`.replace(
          /(\d{2})\/(\d{2})\/(\d{4})(\d{2}):(\d{2})/,
          '$3-$2-$1T$4:$5:00-03:00'
        ),
        activity
      }
    })
  })

  // Get shipping content
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

  await browser.close()

  return { status, delivery, history, shipping }
}
