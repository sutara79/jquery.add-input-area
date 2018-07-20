/**
 * @file Unit Testing
 */
describe('$.addInputArea._getValOfAttr', function () {
  var target;

  afterEach(function () {
    target.remove();
  });

  describe('Default naming convention', function () {
    it('should change the name attribute', function () {
      target = $('<input name="list_0">');
      var returns = $.addInputArea.prototype._getValOfAttr(target, 1, 'name');
      assert.equal(returns, 'list_1');
    });

    it('should change the id attribute', function () {
      target = $('<input id="list_0">');
      var returns = $.addInputArea.prototype._getValOfAttr(target, 2, 'id');
      assert.equal(returns, 'list_2');
    });

    it('should change the for attribute', function () {
      target = $('<label for="list_0">');
      var returns = $.addInputArea.prototype._getValOfAttr(target, 3, 'for');
      assert.equal(returns, 'list_3');
    });

    it('should return false because of lacking the id attribute', function () {
      target = $('<input name="list_0">');
      var returns = $.addInputArea.prototype._getValOfAttr(target, 4, 'id');
      assert.equal(returns, false);
    });

    it('should return false because of lacking the name attribute', function () {
      target = $('<input>');
      var returns = $.addInputArea.prototype._getValOfAttr(target, 5, 'name');
      assert.equal(returns, false);
    });
  });

  describe('User\'s own rule', function () {
    describe('Using original attribute (Deprecated)', function () {
      it('should change the name attribute', function () {
        target = $('<input name="data[posts][mail][0]" name_format="data[posts][mail][%d]">');
        var returns = $.addInputArea.prototype._getValOfAttr(target, 1, 'name');
        assert.equal(returns, 'data[posts][mail][1]');
      });

      it('should change the id attribute', function () {
        target = $('<input id="post_0_mail" id_format="post_%d_mail">');
        var returns = $.addInputArea.prototype._getValOfAttr(target, 12, 'id');
        assert.equal(returns, 'post_12_mail');
      });
    });

    describe('Using custom data attribute (since v4.9.0)', function () {
      it('should change the name attribute', function () {
        target = $('<input name="data[posts][mail][0]" data-name-format="data[posts][mail][%d]">');
        var returns = $.addInputArea.prototype._getValOfAttr(target, 1, 'name');
        assert.equal(returns, 'data[posts][mail][1]');
      });

      it('should change the id attribute', function () {
        target = $('<input id="post_0_mail" data-id-format="post_%d_mail">');
        var returns = $.addInputArea.prototype._getValOfAttr(target, 12, 'id');
        assert.equal(returns, 'post_12_mail', 'The number of "id" attribute should be 12.');
      });
    });
  });
});
