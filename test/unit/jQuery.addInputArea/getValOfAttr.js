/**
 * @file Unit Testing
 */
describe('$.addInputArea._getValOfAttr', () => {
  let target;

  afterEach(() => {
    target.remove();
  });

  describe('Default naming convention', () => {
    it('should change the name attribute', () => {
      target = $('<input name="list_0">');
      const res = $.addInputArea.prototype._getValOfAttr(target, 1, 'name');
      assert.equal(res, 'list_1');
    });

    it('should change the id attribute', () => {
      target = $('<input id="list_0">');
      const res = $.addInputArea.prototype._getValOfAttr(target, 2, 'id');
      assert.equal(res, 'list_2');
    });

    it('should change the for attribute', () => {
      target = $('<label for="list_0">');
      const res = $.addInputArea.prototype._getValOfAttr(target, 3, 'for');
      assert.equal(res, 'list_3');
    });

    it('should return false because of lacking the id attribute', () => {
      target = $('<input name="list_0">');
      const res = $.addInputArea.prototype._getValOfAttr(target, 4, 'id');
      assert.equal(res, false);
    });

    it('should return false because of lacking the name attribute', () => {
      target = $('<input>');
      const res = $.addInputArea.prototype._getValOfAttr(target, 5, 'name');
      assert.equal(res, false);
    });
  });

  describe('User\'s own rule', () => {
    describe('Using original attribute (Deprecated)', () => {
      it('should change the name attribute', () => {
        target = $('<input name="data[posts][mail][0]" name_format="data[posts][mail][%d]">');
        const res = $.addInputArea.prototype._getValOfAttr(target, 1, 'name');
        assert.equal(res, 'data[posts][mail][1]');
      });

      it('should change the id attribute', () => {
        target = $('<input id="post_0_mail" id_format="post_%d_mail">');
        const res = $.addInputArea.prototype._getValOfAttr(target, 12, 'id');
        assert.equal(res, 'post_12_mail');
      });
    });

    describe('Using custom data attribute (since v4.9.0)', () => {
      it('should change the name attribute', () => {
        target = $('<input name="data[posts][mail][0]" data-name-format="data[posts][mail][%d]">');
        const res = $.addInputArea.prototype._getValOfAttr(target, 1, 'name');
        assert.equal(res, 'data[posts][mail][1]');
      });

      it('should change the id attribute', () => {
        target = $('<input id="post_0_mail" data-id-format="post_%d_mail">');
        const res = $.addInputArea.prototype._getValOfAttr(target, 12, 'id');
        assert.equal(res, 'post_12_mail', 'The number of "id" attribute should be 12.');
      });
    });
  });
});
