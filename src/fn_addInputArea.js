/**
 * @function external:jQuery.prototype.addInputArea
 * @arg {Object}   [option]                      - Options user sent.
 * @arg {string}   [option.area_var='.(id)_var'] - CSS class selector for wrapper of form fields.
 * @arg {string}   [option.btn_add='.(id)_add']  - CSS class selector for add button.
 * @arg {string}   [option.btn_del='.(id)_del']  - CSS class selector for delete button.
 * @arg {string}   [option.area_del=(btn_del)]   - CSS class selector for wrapper of delete button.
 * @arg {Function} [option.after_add=null]       - A callback function to be called after adding.
 * @arg {boolean}  [option.clone_event=true]     - If event will be copied or not.
 * @arg {number}   [option.maximum=0]            - Max number of wrapper of form fields. "0" means unlimited.
 * @return {Object} jQuery object for method chaining.
 */
/*global $*/
export default function (option) {
  return this.each(function() {
    new $.addInputArea(this, option);
  });
}