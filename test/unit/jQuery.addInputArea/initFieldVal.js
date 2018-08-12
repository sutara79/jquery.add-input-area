/**
 * @file Unit Testing
 */
describe('$.addInputArea._initFieldVal', () => {
  let target;

  afterEach(function () {
    target.remove();
  });

  it('should not change the value', () => {
    target = $('<input empty_val="false">');
    const res = $.addInputArea.prototype._initFieldVal(target);
    assert.equal(res, false);
  });

  it('should not change the value', () => {
    target = $('<input data-empty-val="false">');
    const res = $.addInputArea.prototype._initFieldVal(target);
    assert.equal(res, false);
  });

  it('init checkbox', () => {
    target = $('<input type="checkbox">');
    const res = $.addInputArea.prototype._initFieldVal(target);
    assert.equal(res, true);
    assert.equal(target.checked, false);
  });

  it('init text-box', () => {
    target = $('<input type="text" value="foo">');
    const res = $.addInputArea.prototype._initFieldVal(target);
    assert.equal(res, true);
    assert.equal(target.val(), '');
  });

  it('should not init value of submit-button', () => {
    target = $('<input type="submit" value="Send!">');
    const res = $.addInputArea.prototype._initFieldVal(target);
    assert.equal(res, true);
    assert.equal(target.val(), 'Send!');
  });
});
