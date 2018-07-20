/**
 * @file Integration Testing
 */
describe('Integration Testing', function () {
  var target;
  beforeEach(function () {
    target = $(
      '<ol id="list">' +
        '<li class="list_var">' +
          '<label for="list_0">Text</label>' +
          '<input type="text" size="30" name="list_0" id="list_0">' +
          '<button type="button" class="list_del">Delete</button>' +
        '</li>' +
      '</ol>' +
      '<input type="button" value="Add" class="list_add" id="add-button">'
    ).appendTo('body');
  });

  afterEach(function () {
    target.remove();
  });

  it('should work with after_add option', async function () {
    var check = true;

    await target.addInputArea({after_add: function(){ check = false }});
    assert.equal($('.list_var').length, 1, 'The number of the wrapper should be 1.');

    await $('#add-button').trigger('click');
    assert.equal(check, false, 'after_add should be run.');
    assert.equal($('.list_var').length, 2, 'The number of the wrapper should be increased.');

    await $('#list_1+.list_del').trigger('click');
    assert.equal($('.list_var').length, 1, 'The number of the wrapper should be decreased.');
  });

  it('should work with maximum option', async function () {
    await target.addInputArea({maximum : 2});
    assert.equal($('#add-button').is(':visible'), true, 'Add-button should be visible.');

    await $('#add-button').trigger('click');
    assert.equal($('#add-button').is(':hidden'), true, 'Add-button should be hidden.');

    await $('#list_1+.list_del').trigger('click');
    assert.equal($('#add-button').is(':visible'), true, 'Add-button should be visible.');
  });
});
