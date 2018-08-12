/** @external "jQuery.fn" */
/*global $*/
import fn_addInputArea from './fn_addInputArea';
import addInputArea    from './addInputArea';
import methods         from './methods';

$.fn.addInputArea = fn_addInputArea;
$.addInputArea    = addInputArea;
$.extend($.addInputArea.prototype, methods);