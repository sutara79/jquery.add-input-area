/**
 * @file Unit Testing
 */
describe('$.fn.addInputArea', function() {
  var target;

  before(function() {
    target = $('<div id="target">').appendTo('body');
  });

  after(function() {
    target.remove();
  });

  it('should return jQuery object', function() {
    assert.strictEqual(target, target.addInputArea());
    assert.strictEqual(target, target.addInputArea({}));
  });
});
