/**
 * @file Unit Testing by QUnit 1.x -- $.addInputArea._getValOfAttr()
 */
jQuery(document).ready(function($) {

  module('$.addInputArea._getValOfAttr', {
    setup: function() {
      this.$target;
    },
    teardown: function() {
      this.$target.remove();
    }
  });

  //============================
  // Default naming convention
  //============================
  test('"name" attribute is set.', 1, function() {
    this.$target = $('<input name="list_0">');
    var returns = $.addInputArea.prototype._getValOfAttr(this.$target, 1, 'name');
    equal(returns, 'list_1', 'The number of "name" attribute should be 1.');
  });

  test('"id" attribute is set.', 1, function() {
    this.$target = $('<input id="list_0">');
    var returns = $.addInputArea.prototype._getValOfAttr(this.$target, 2, 'id');
    equal(returns, 'list_2', 'The number of "id" attribute should be 2.');
  });

  test('"for" attribute is set.', 1, function() {
    this.$target = $('<label for="list_0">');
    var returns = $.addInputArea.prototype._getValOfAttr(this.$target, 3, 'for');
    equal(returns, 'list_3', 'The number of "for" attribute should be 3.');
  });

  test('"name" attribute is set but not "id".', 1, function() {
    this.$target = $('<input name="list_0">');
    var returns = $.addInputArea.prototype._getValOfAttr(this.$target, 4, 'id');
    equal(returns, false, 'Retruns shuld be "false" as it does not have "id" attribute.');
  });

  test('"name" attribute is not set.', 1, function() {
    this.$target = $('<input>');
    var returns = $.addInputArea.prototype._getValOfAttr(this.$target, 5, 'name');
    equal(returns, false, 'Retruns shuld be "false" as it does not have "name" attribute.');
  });

  //============================
  // User's own rule
  //============================
  test('Deprecated custom attribute.', 1, function() {
    this.$target = $('<input name="data[posts][mail][0]" name_format="data[posts][mail][%d]">');
    var returns = $.addInputArea.prototype._getValOfAttr(this.$target, 1, 'name');
    equal(returns, 'data[posts][mail][1]', 'The number of "name" attribute should be 1.');
  });

  test('Custom data attribute (since v4.9.0).', 1, function() {
    this.$target = $('<input name="data[posts][mail][0]" data-name-format="data[posts][mail][%d]">');
    var returns = $.addInputArea.prototype._getValOfAttr(this.$target, 1, 'name');
    equal(returns, 'data[posts][mail][1]', 'The number of "name" attribute should be 1.');
  });

  test('Deprecated custom attribute.', 1, function() {
    this.$target = $('<input id="post_0_mail" id_format="post_%d_mail">');
    var returns = $.addInputArea.prototype._getValOfAttr(this.$target, 12, 'id');
    equal(returns, 'post_12_mail', 'The number of "id" attribute should be 12.');
  });

  test('Custom data attribute (since v4.9.0).', 1, function() {
    this.$target = $('<input id="post_0_mail" data-id-format="post_%d_mail">');
    var returns = $.addInputArea.prototype._getValOfAttr(this.$target, 12, 'id');
    equal(returns, 'post_12_mail', 'The number of "id" attribute should be 12.');
  });

});