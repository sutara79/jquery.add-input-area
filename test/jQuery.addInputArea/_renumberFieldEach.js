/**
 * @file Unit Testing by QUnit 1.x -- $.addInputArea._renumberFieldEach()
 */
jQuery(document).ready(function($) {

  module('$.addInputArea._renumberFieldEach', {
    setup: function() {
      // Prepare DOM
      var html = '' +
        '<li class="list_var">' +
          '<label for="list-a_0">Text</label>' +
          '<input type="text" size="30" name="list-a_0" id="list-a_0">' +
          '<label for="list-b_0">Text</label>' +
          '<input type="text" size="30" name="list-b_0" id="list-b_0">' +
        '</li>';

      this.$target = $(html).appendTo('body');
    },
    teardown: function() {
      this.$target.remove();
    }
  });

  test('renumber', 6, function() {
    $.addInputArea.prototype._renumberFieldEach(456, this.$target);
    equal($('.list_var input').eq(0).attr('name'), 'list-a_456');
    equal($('.list_var input').eq(0).attr('id'),   'list-a_456');
    equal($('.list_var label').eq(0).attr('for'),  'list-a_456');

    equal($('.list_var input').eq(1).attr('name'), 'list-b_456');
    equal($('.list_var input').eq(1).attr('id'),   'list-b_456');
    equal($('.list_var label').eq(1).attr('for'),  'list-b_456');
  });

});