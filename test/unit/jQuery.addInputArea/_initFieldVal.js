/**
 * @file Unit Testing
 */
describe('$.addInputArea._initFieldVal', function () {
  var target;

  afterEach(function () {
    target.remove();
  });

  it('should not change the value', function () {
    target = $('<input empty_val="false">');
    var returns = $.addInputArea.prototype._initFieldVal(target);
    assert.equal(returns, false);
  });

  it('should not change the value', function () {
    target = $('<input data-empty-val="false">');
    var returns = $.addInputArea.prototype._initFieldVal(target);
    assert.equal(returns, false);
  });

  it('init checkbox', function () {
    target = $('<input type="checkbox">');
    var returns = $.addInputArea.prototype._initFieldVal(target);
    assert.equal(returns, true);
    assert.equal(target.checked, false);
  });

  it('init text-box', function () {
    target = $('<input type="text" value="foo">');
    var returns = $.addInputArea.prototype._initFieldVal(target);
    assert.equal(returns, true);
    assert.equal(target.val(), '');
  });

  it('should not init value of submit-button', function () {
    target = $('<input type="submit" value="Send!">');
    var returns = $.addInputArea.prototype._initFieldVal(target);
    assert.equal(returns, true);
    assert.equal(target.val(), 'Send!');
  });
});
