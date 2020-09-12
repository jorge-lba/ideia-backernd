const puppeteer = require('puppeteer')
const path = require('path')

const url = path.join(__dirname, '..', 'html', 'index.html')
console.log(url)

const loginFirebaseAuth = async (data) => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] })
  const page = await browser.newPage()
  await page.goto('file://' + url)
  const token = await page.evaluate(async (data) => {
    document.getElementById('inputEmail').value = data.email
    document.getElementById('inputPassword').value = data.password
    await document.getElementById('btnLogin').click()

    function sleep (ms) {
      return new Promise(resolve => setTimeout(resolve, ms))
    }

    // eslint-disable-next-line no-undef
    while (userTokenFirebaseAuthentication === '') {
      await sleep(100)
    }
    // eslint-disable-next-line no-undef
    return userTokenFirebaseAuthentication
  }, data)

  await browser.close()

  return token
}

module.exports = loginFirebaseAuth
