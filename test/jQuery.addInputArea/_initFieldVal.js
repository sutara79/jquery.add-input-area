/**
 * @file Unit Testing by QUnit 1.x -- $.addInputArea._initFieldVal()
 */
jQuery(document).ready(function($) {

  module('$.addInputArea._initFieldVal', {
    setup: function() {
      this.$target;
    },
    teardown: function() {
      this.$target.remove();
    }
  });

  test('Deprecated custom attribute', 1, function() {
    this.$target = $('<input empty_val="false">');
    var returns = $.addInputArea.prototype._initFieldVal(this.$target);
    equal(returns, false, 'The value should not be changed.');
  });

  test('Custom data attribute (since v4.9.0)', 1, function() {
    this.$target = $('<input data-empty-val="false">');
    var returns = $.addInputArea.prototype._initFieldVal(this.$target);
    equal(returns, false, 'The value should not be changed.');
  });

  test('Checkbox', 2, function() {
    this.$target = $('<input type="checkbox">');
    var returns = $.addInputArea.prototype._initFieldVal(this.$target);
    equal(returns, true);
    equal(this.$target.checked, false, '"checked" attribute should be removed.');
  });

  test('Text-box', 2, function() {
    this.$target = $('<input type="text" value="foo">');
    var returns = $.addInputArea.prototype._initFieldVal(this.$target);
    equal(returns, true);
    equal(this.$target.val(), '', 'The value should be empty.');
  });

  // 送信ボタンは変化なし
  test('Submit button', 2, function() {
    this.$target = $('<input type="submit" value="Send!">');
    var returns = $.addInputArea.prototype._initFieldVal(this.$target);
    equal(returns, true);
    equal(this.$target.val(), 'Send!', 'The value should not be changed.');
  });

});