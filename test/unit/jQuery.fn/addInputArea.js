/**
 * @file Unit Testing
 */
describe('$.fn.addInputArea', () => {
  let target;

  before(() => {
    target = $('<div id="target">').appendTo('body');
  });

  after(() => {
    target.remove();
  });

  it('should return jQuery object', () => {
    assert.strictEqual(target, target.addInputArea());
    assert.strictEqual(target, target.addInputArea({}));
  });
});
