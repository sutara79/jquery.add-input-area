/**
 * @file E2E testing
 */
const puppeteer = require('puppeteer');
const assert = require('assert');

let path = 'demo/maximum';
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

  describe('Option: maximum', function () {
    it('should allow to add', async function () {
      await page.click('.list_add');
      await page.waitFor(50);
      await page.click('.list_add');
      await page.waitFor(50);

      const isVisible = await page.evaluate(() => {
        const e = document.querySelector('.list_add');
        const style = window.getComputedStyle(e);
        return style.display !== 'none';
      });
      assert.equal(isVisible, true);
      let list_var = await page.$$('.list_var');
      assert.equal(list_var.length, 3);
    });

    it('should not allow to add', async function () {
      await page.click('.list_add');
      await page.waitFor(50);

      const isVisible = await page.evaluate(() => {
        const e = document.querySelector('.list_add');
        const style = window.getComputedStyle(e);
        return style.display !== 'none';
      });
      assert.equal(isVisible, false);
      let list_var = await page.$$('.list_var');
      assert.equal(list_var.length, 4);
    });
  });
});
