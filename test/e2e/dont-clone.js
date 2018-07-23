/**
 * @file E2E testing
 */
const puppeteer = require('puppeteer');
const assert = require('assert');

let path = 'demo/dont-clone';
describe(path, function () {
  const appUrl = `http://localhost:${process.env.MY_PORT}/${path}`;
  let browser, page;

  before(async function () {
    browser = await puppeteer.launch({args: ['--no-sandbox']});
    // browser = await puppeteer.launch({headless: false, slowMo: 250});
    page = await browser.newPage();
    page.on('console', console.log);
    await page.goto(appUrl, {waitUntil: 'load'});
  });

  after(async function () {
    browser.close();
  });

  describe('Option: dont_clone', function () {
    it('should not allow to clone', async function () {
      await page.click('.list_add');
      await page.waitFor(50);

      let elem;
      elem = await page.$$('.list_var:nth-child(1) div');
      assert.equal(elem.length, 2);
      elem = await page.$$('.list_var:nth-child(2) div');
      assert.equal(elem.length, 1);
    });
  });
});
