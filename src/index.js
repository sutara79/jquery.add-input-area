/**
 * @file jquery.add-input-area
 * @version 4.9.4
 * @author Yuusaku Miyazaki <toumin.m7@gmail.com>
 * @license MIT
 */
import fn_addInputArea from './fn_addInputArea';
import addInputArea    from './addInputArea';
import methods         from './methods';

/*global $*/
/** @external jQuery */
$.fn.addInputArea = fn_addInputArea;
$.addInputArea    = addInputArea;
$.extend($.addInputArea.prototype, methods);