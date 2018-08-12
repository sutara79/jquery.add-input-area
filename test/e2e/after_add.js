/**
 * @file E2E testing
 */
const puppeteer = require('puppeteer');
const assert = require('assert');

let path = 'demo/after-add';
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

  describe('Option: after_add', function () {
    it('should display dialog', async function () {
      let msg;
      page.on('dialog', async dialog => {
        msg = dialog.message();
        await dialog.dismiss();
      });
      await page.click('.list_add');
      await page.waitFor(50);

      assert.equal(msg, 'Added!');

      let elem = await page.$$('.list_var');
      assert.equal(elem.length, 2);
    });
  });
});
