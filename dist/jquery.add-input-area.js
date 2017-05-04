/**
 * @file jquery.add-input-area
 * @version 4.9.1
 * @author Yuusaku Miyazaki <toumin.m7@gmail.com>
 * @license MIT
 */
/** @external "jQuery.fn" */
/** @external jQuery */
(function (factory) {
  if(typeof module === 'object' && typeof module.exports === 'object') {
    factory(require('jquery'), window, document);
  } else {
    factory(jQuery, window, document);
  }
}(function($, window, document, undefined) {

/**
 * @function external:"jQuery.fn".addInputArea
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
$.fn.addInputArea = function(option) {
  return this.each(function() {
    new $.addInputArea(this, option);
  });
};

/**
 * @class external:jQuery.addInputArea
 * @arg  {Object} elem   - HTML element which applied this plugin.
 * @arg  {Object} option - Options user sent.
 * @prop {Object} elem   - HTML element which applied this plugin.
 * @prop {Object} option - initialized options.
 */
$.addInputArea = function(elem, option) {
  this.elem = elem;
  this.option = this._setOption(option, $(this.elem).attr('id'));
  this._setDelBtnVisibility();

  var self = this;
  $(document).on('click', this.option.btn_add, function() {
    self._ehAddBtn.call(self);
  });
  $(self.elem).on('click', self.option.btn_del, function(ev) {
    self._ehDelBtn.call(self, ev);
  });

  this._renumberFieldAll();

  // Save original
  this.option.original = $(this.elem).find(this.option.area_var).eq(0).clone(this.option.clone_event);
};

$.extend($.addInputArea.prototype, /** @lends external:jQuery.addInputArea.prototype */ {
  /**
   * Initialize option
   * @private
   * @arg {Object} option - Options user sent.
   * @arg {string} id     - Id attribute of "this.elem".
   * @return {Object} initialized options.
   */
  _setOption: function(option, id) {
    option =  $.extend({
      btn_del:   (id) ? '.' + id + '_del' : '.aia_del',
      btn_add:   (id) ? '.' + id + '_add' : '.aia_add',
      area_var:  (id) ? '.' + id + '_var' : '.aia_var',
      area_del: null,
      after_add: null,
      clone_event: true,
      maximum: 0
    }, option);
    if (!option.area_del) {
      option.area_del = option.btn_del;
    }
    return option;
  },

  /**
   * If the wrapper is single, del-button is not displayed.
   * @private
   */
  _setDelBtnVisibility: function() {
    if ($(this.elem).find(this.option.area_var).length == 1) {
      $(this.elem).find(this.option.area_del).hide();
    }
  },

  /**
   * Handler for clicking add-button.
   * @private
   */
  _ehAddBtn: function() {
    // Add new wrapper.
    this._addNewArea();

    // Display del-button as it is sure that the number of the wrapper will be more than 2.
    $(this.elem).find(this.option.area_del).show();

    // Hide add-button if the number of the wrapper reaches max number.
    if (
      this.option.maximum > 0 &&
      $(this.elem).find(this.option.area_var).length >= this.option.maximum
    ) {
      $(this.option.btn_add).hide();
    }

    // Run "after_add" function.
    if (typeof this.option.after_add == 'function') {
      this.option.after_add();
    }
  },

  /**
   * Add new wrapper.
   * @private
   */
  _addNewArea: function() {
    var idxNewArea = $(this.elem).find(this.option.area_var).length;
    var newArea = $(this.option.original).clone(true);

    // Renumber "id", "name" and "for" attribute of single field.
    this._renumberFieldEach(idxNewArea, newArea);

    var self = this;
    $(newArea)
      // Empty value of form field.
      .find('[name]').each(function() {
        self._initFieldVal.call(self, this);
      }).end()
      // Add to DOM.
      .appendTo(this.elem);
  },

  /**
   * Empty value of form field.
   * @private
   * @arg {Object} obj - Single form field.
   * @return {boolean} If init succeeded or not.
   */
  _initFieldVal: function(obj) {
    // NOTE: empty_val is deprecated (since v4.9.0)
    if ($(obj).attr('empty_val') == 'false' ||
        $(obj).attr('data-empty-val') == 'false') {
      return false;
    }
    if ($(obj).attr('type') == 'checkbox' ||
        $(obj).attr('type') == 'radio') {
      obj.checked = false;
    } else if ($(obj).prop('tagName') != 'SELECT' &&
               $(obj).attr('type') != 'submit' &&
               $(obj).attr('type') != 'reset'  &&
               $(obj).attr('type') != 'image'  &&
               $(obj).attr('type') != 'button') {
      $(obj).val('');
    }
    return true;
  },

  /**
   * Handler for clicking of del-button.
   * @private
   * @arg {Object} ev - Event object.
   */
  _ehDelBtn: function(ev) {
    ev.preventDefault();

    // Delete the wrapper
    var idx = $(this.elem).find(this.option.btn_del).index(ev.target);
    $(this.elem).find(this.option.area_var).eq(idx).remove();

    // If the wrapper is single, del-button is not displayed.
    this._setDelBtnVisibility();

    // Renumber "id", "name" and "for" attribute of all fields in the wrapper.
    this._renumberFieldAll();

    // Show add-button if the number of the wrapper does not reach max number.
    if (this.option.maximum > 0 &&
        $(this.elem).find(this.option.area_var).length < this.option.maximum) {
      $(this.option.btn_add).show();
    }
  },

  /**
   * Renumber "id", "name" and "for" attribute of all fields in the wrapper.
   * @private
   */
  _renumberFieldAll: function() {
    var self = this;
    $(this.elem).find(this.option.area_var).each(function(idx, obj) {
      self._renumberFieldEach.call(self, idx, obj);
    });
  },

  /**
   * Renumber "id", "name" and "for" attribute of single field.
   * @private
   * @arg {number} idx - Index of the wrapper.
   * @arg {Object} obj - HTML Element of the wrapper.
   */
  _renumberFieldEach: function(idx, obj) {
    var self = this;
    $(obj)
      // Rename "name" and "id" attribute.
      .find('[name]').each(function() {
        $(this).attr('name', self._getValOfAttr(this, idx, 'name'));
        $(this).attr('id',   self._getValOfAttr(this, idx, 'id'));
      }).end()
      // Rename "for" attribute.
      .find('[for]').each(function() {
        $(this).attr('id', self._getValOfAttr(this, idx, 'for'));
      });
  },

  /**
   * Return the renumbered value of "id", "name" or "for" attribute.
   * @private
   * @arg {Object} obj - Single form field.
   * @arg {number} idx - The number for renumbering.
   * @arg {string} type - Attribute name. (id, name, for)
   * @return {boolean|string} The renumbered value, or "false" to notify failed.
   */
  _getValOfAttr: function(obj, idx, type) {
    var newVal = false;
    // If the default naming convention.
    if (/^.+_\d+$/.test($(obj).attr(type))) {
      newVal =  $(obj).attr(type).replace(/^(.+_)\d+$/, '$1' + idx);
    }
    // If user's own rule.
    else {
      // NOTE: name_format and id_format are deprecated (since v4.9.0)
      var customFormat;
      if (type == 'name') {
        customFormat = $(obj).attr('name_format') || $(obj).attr('data-name-format');
      } else { // id, for
        customFormat = $(obj).attr('id_format') || $(obj).attr('data-id-format');
      }
      if (customFormat) {
        newVal = customFormat.replace('%d', idx);
      }
    }
    return newVal;
  }
});

}));
