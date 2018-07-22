/**
 * @file Integration Testing
 */
describe('Option: dont_clone', function () {
  var target;
  beforeEach(function () {
    target = $(`
      <ol id="list">
        <li class="list_var">
          <div>This will be cloned.</div>
          <div class="dont_clone">This will NOT be cloned.</div>
          <input type="text" size="30" name="list_0" id="list_0">
          <button type="button" class="list_del">Delete</button>
        </li>
      </ol>
      <input type="button" value="Add" class="list_add">
    `).appendTo('body');
  });

  afterEach(function () {
    target.remove();
  });

  it('should clone', async function () {
    await target.addInputArea(); // The dont_clone option is not set.
    await $('.list_add').trigger('click');
    assert.equal($('.list_var').eq(1).find('.dont_clone').length, 1);
  });

  it('should not clone', async function () {
    await target.addInputArea({dont_clone: '.dont_clone'});
    await $('.list_add').trigger('click');
    assert.equal($('.list_var').eq(1).find('.dont_clone').length, 0);
  });
});
