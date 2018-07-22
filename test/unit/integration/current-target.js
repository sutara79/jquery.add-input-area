/**
 * @file Integration Testing
 * @see https://github.com/sutara79/jquery.add-input-area/issues/10
 */
describe('event.currentTarget', function () {
  var target;
  beforeEach(async function () {
    target = $(`
      <ol id="list">
        <li class="list_var">
          <input type="text" size="30" name="list_0" id="list_0">
          <button type="button" class="list_del">
            <span class="del-child">Delete</span>
          </button>
        </li>
      </ol>
      <input type="button" value="Add" class="list_add">
    `).appendTo('body');
    await target.addInputArea();
    await $('#list_0').val('a');
    await $('.list_add').trigger('click');
    await $('#list_1').val('b');
    await $('.list_add').trigger('click');
    await $('#list_2').val('c');
  });

  afterEach(function () {
    target.remove();
  });

  it('should remove certain element when clicking button', async function () {
    await $('.list_var').eq(0).find('.list_del').trigger('click');
    assert.equal($('.list_var').length, 2);
    assert.equal($('#list_0').val(), 'b');
  });

  it('should remove certain element when clicking span', async function () {
    await $('.list_var').eq(0).find('.del-child').trigger('click');
    assert.equal($('.list_var').length, 2);
    assert.equal($('#list_0').val(), 'b');
  });
});
