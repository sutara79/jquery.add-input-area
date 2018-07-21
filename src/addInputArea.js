/**
 * @class external:jQuery.addInputArea
 * @arg  {Object} elem   - HTML element which applied this plugin.
 * @arg  {Object} option - Options user sent.
 * @prop {Object} elem   - HTML element which applied this plugin.
 * @prop {Object} option - initialized options.
 */
/*global $*/
export default function (elem, option) {
  this.elem = elem;
  this.option = this._setOption(option, $(this.elem).attr('id'));
  this._setDelBtnVisibility();

  var self = this;
  $(document).on('click', this.option.btn_add, function () {
    self._ehAddBtn.call(self);
  });
  $(self.elem).on('click', self.option.btn_del, function (ev) {
    self._ehDelBtn.call(self, ev);
  });

  this._renumberFieldAll();

  // Save original
  this.option.original = $(this.elem).find(this.option.area_var).eq(0).clone(this.option.clone_event);

  // dont_clone
  if (this.option.dont_clone) {
    $(this.option.original).find(this.option.dont_clone).detach();
  }
}