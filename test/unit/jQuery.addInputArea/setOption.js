/**
 * @file Unit Testing
 */
describe('$.addInputArea._setOption', () => {
  it('should return default value', () => {
    let option;
    let id;
    const res = $.addInputArea.prototype._setOption(option, id);

    assert.equal(res.btn_del, '.aia_del');
    assert.equal(res.btn_add, '.aia_add');
    assert.equal(res.area_var, '.aia_var');
    assert.equal(res.area_del, res.btn_del);
  });

  it('should set option "area_del"', () => {
    let option = {
      area_del: ".foo"
    };
    let id;
    const res = $.addInputArea.prototype._setOption(option, id);

    assert.equal(res.btn_del, '.aia_del');
    assert.equal(res.btn_add, '.aia_add');
    assert.equal(res.area_var, '.aia_var');
    assert.equal(res.area_del, '.foo');
  });

  it('should follow name conventions', () => {
    let option = null;
    let id = "foo";
    const res = $.addInputArea.prototype._setOption(option, id);

    assert.equal(res.btn_del, '.foo_del');
    assert.equal(res.btn_add, '.foo_add');
    assert.equal(res.area_var, '.foo_var');
    assert.equal(res.area_del, res.btn_del);
  });
});
