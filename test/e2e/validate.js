/**
 * @file E2E testing
 */
const puppeteer = require('puppeteer');
const assert = require('assert');

let path = 'demo/validate';
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

  describe('Validation', function () {
    it('should prevent from adding', async function () {
      await page.click('.list_add');
      await page.waitFor(50);
      let elem = await page.$$('.list_var');
      assert.equal(elem.length, 1);
    });

    it('should prevent from adding', async function () {
      await page.type('#list-text_0', 'a');
      await page.click('.list_add');
      await page.waitFor(50);
      let elem = await page.$$('.list_var');
      assert.equal(elem.length, 1);
    });

    it('should allow to add', async function () {
      await page.click('#list-radio-bbb_0');
      await page.click('.list_add');
      await page.waitFor(50);
      let elem = await page.$$('.list_var');
      assert.equal(elem.length, 2);
    });
  });
});
