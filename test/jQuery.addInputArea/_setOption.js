/**
 * @file Unit Testing by QUnit 1.x -- $.addInputArea._setOption()
 */
jQuery(document).ready(function($) {

  module('$.addInputArea._setOption');

  test('()', 4, function() {
    var option;
    var id;
    var returns = $.addInputArea.prototype._setOption(option, id);
    equal(returns.btn_del, '.aia_del');
    equal(returns.btn_add, '.aia_add');
    equal(returns.area_var, '.aia_var');
    equal(returns.area_del, returns.btn_del);
  });

  test('({area_del: "foo"})', 4, function() {
    var option = {
      area_del: "foo"
    };
    var id;
    var returns = $.addInputArea.prototype._setOption(option, id);
    equal(returns.btn_del, '.aia_del');
    equal(returns.btn_add, '.aia_add');
    equal(returns.area_var, '.aia_var');
    notEqual(returns.area_del, returns.btn_del);
  });

  test('(null, "foo")', 4, function() {
    var option = null;
    var id = "foo";
    var returns = $.addInputArea.prototype._setOption(option, id);
    equal(returns.btn_del, '.foo_del');
    equal(returns.btn_add, '.foo_add');
    equal(returns.area_var, '.foo_var');
    equal(returns.area_del, returns.btn_del);
  });

});