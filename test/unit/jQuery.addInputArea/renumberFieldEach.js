/**
 * @file Unit Testing
 */
describe('$.addInputArea._renumberFieldEach', function () {
  var target;

  beforeEach(function () {
    target = $(
      '<li class="list_var">' +
        '<label for="list-a_0">Text</label>' +
        '<input type="text" size="30" name="list-a_0" id="list-a_0">' +
        '<label for="list-b_0">Text</label>' +
        '<input type="text" size="30" name="list-b_0" id="list-b_0">' +
      '</li>'
    ).appendTo('body');
  });

  afterEach(function () {
    target.remove();
  });

  it('should renumber', function() {
    $.addInputArea.prototype._renumberFieldEach(456, target);
    assert.equal($('.list_var input').eq(0).attr('name'), 'list-a_456');
    assert.equal($('.list_var input').eq(0).attr('id'),   'list-a_456');
    assert.equal($('.list_var label').eq(0).attr('for'),  'list-a_456');

    assert.equal($('.list_var input').eq(1).attr('name'), 'list-b_456');
    assert.equal($('.list_var input').eq(1).attr('id'),   'list-b_456');
    assert.equal($('.list_var label').eq(1).attr('for'),  'list-b_456');
  });
});