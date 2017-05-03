/**
 * @file Integration Testing by QUnit 1.x -- jquery.add-input-area
 */
jQuery(document).ready(function($) {

  module('Integration Testing', {
    setup: function() {
      // Prepare DOM
      var html = '' +
        '<ol id="list">' +
          '<li class="list_var">' +
            '<label for="list_0">Text</label>' +
            '<input type="text" size="30" name="list_0" id="list_0">' +
            '<button type="button" class="list_del">Delete</button>' +
          '</li>' +
        '</ol>' +
        '<input type="button" value="Add" class="list_add" id="add-button">';

      this.$target = $(html).appendTo('body');
    },
    teardown: function() {
      this.$target.remove();
    }
  });

  test('"after_add" option is set.', 4, function() {
    var check = true;
    this.$target.addInputArea({after_add: function(){ check = false }});
    equal($('.list_var').length, 1, 'The number of the wrapper should be 1.');

    stop();
    setTimeout(function() {
      start();
      $('#add-button').trigger('click');

      stop();
      setTimeout(function() {
        start();
        equal(check, false, '"after_add" should be run.');
        equal($('.list_var').length, 2, 'The number of the wrapper should be increased.');
        $('#list_1+.list_del').trigger('click');

        stop();
        setTimeout(function() {
          start();
          equal($('.list_var').length, 1, 'The number of the wrapper should be decreased.');
        }, 100);
      }, 100);
    }, 100);
  });

  test('"maximum" option is set.', 3, function() {
    this.$target.addInputArea({maximum : 2});

    stop();
    setTimeout(function() {
      start();
      equal($('#add-button').is(':visible'), true, 'Add-button should be visible.');
      $('#add-button').trigger('click');

      stop();
      setTimeout(function() {
        start();
        equal($('#add-button').is(':hidden'), true, 'Add-button should be hidden.');
        $('#list_1+.list_del').trigger('click');

        stop();
        setTimeout(function() {
          start();
          equal($('#add-button').is(':visible'), true, 'Add-button should be visible.');
        }, 100);
      }, 100);
    }, 100);
  });

});