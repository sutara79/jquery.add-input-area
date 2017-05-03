/**
 * @file Unit Testing by QUnit 1.x -- $.fn.addInputArea()
 */
jQuery(document).ready(function($) {

  module('$.fn.addInputArea', {
    setup: function() {
      $('<div id="target">').appendTo('body');
      this.target = $('#target');
    },
    teardown: function() {
      this.target.remove();
    }
  });

  test('Pass no arg.', 1, function() {
    var returns = this.target.addInputArea();
    strictEqual(this.target, returns, 'Returned value should be jQuery object.');
  });

  test('Pass epmty object.', 1, function() {
    var returns = this.target.addInputArea({});
    strictEqual(this.target, returns, 'Returned value should be jQuery object.');
  });

});