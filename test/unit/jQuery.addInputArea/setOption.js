/**
 * @file Unit Testing
 */
describe('$.addInputArea._setOption', function() {
  it('should return default value', function() {
    var option;
    var id;
    var returns = $.addInputArea.prototype._setOption(option, id);

    assert.equal(returns.btn_del, '.aia_del');
    assert.equal(returns.btn_add, '.aia_add');
    assert.equal(returns.area_var, '.aia_var');
    assert.equal(returns.area_del, returns.btn_del);
  });

  it('should set option "area_del"', function() {
    var option = {
      area_del: ".foo"
    };
    var id;
    var returns = $.addInputArea.prototype._setOption(option, id);

    assert.equal(returns.btn_del, '.aia_del');
    assert.equal(returns.btn_add, '.aia_add');
    assert.equal(returns.area_var, '.aia_var');
    assert.equal(returns.area_del, '.foo');
  });

  it('should follow name conventions', function() {
    var option = null;
    var id = "foo";
    var returns = $.addInputArea.prototype._setOption(option, id);

    assert.equal(returns.btn_del, '.foo_del');
    assert.equal(returns.btn_add, '.foo_add');
    assert.equal(returns.area_var, '.foo_var');
    assert.equal(returns.area_del, returns.btn_del);
  });
});
