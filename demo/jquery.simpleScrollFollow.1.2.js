/**
 * @file jQuery Plugin: jquery.simpleScrollFollow
 * @version 1.2
 * @author Yuusaku Miyazaki [toumin.m7@gmail.com]
 * @license MIT License
 */
(function($) {

/**
 * @desc プラグインをjQueryのプロトタイプに追加する
 * @global
 * @memberof jQuery
 * @param {Object} [option] オプションを格納した連想配列
 * @param {boolean|undefined} [option.instance=undefined] - プラグインを呼び出すとき、jQueryオブジェクトではなく、インスタンスを返すかどうかの真偽値
 * @param {boolean} [option.enabled=true] - スクロールを有効にするかどうかの真偽値
 * @param {Object} [option.limit_elem='window'] - 追尾要素のスクロールの下限の基準となる要素のオブジェクト
 * @param {number} [option.min_width=0] - 追尾スクロールを有効にする最低限の幅
 * @return {Object|Array} - jQueryオブジェクト、または、インスタンスを返すオプションが有効な場合はインスタンスの配列
 */
$.fn.simpleScrollFollow = function(option) {
	var arr = [];
	this.each(function() {
		arr.push(new SimpleScrollFollow(this, option));
	});
	return (option != undefined && option.instance != undefined && option.instance) ? $(arr) : this;
};

/**
 * @global
 * @constructor
 * @classdesc 要素ごとに適用される処理を集めたクラス
 * @param {Object} elem - プラグインを適用するHTML要素
 * @param {Object} option - オプションを格納した連想配列
 *
 * @prop {Object} option - オプションを格納した連想配列
 * @prop {Object} follow - 追尾要素の情報を格納した連想配列
 * @prop {Object} follow.elem - 追尾するHTML要素のjQueryオブジェクト
 * @prop {number} follow.offset_top - 追尾要素の元々のオフセット・トップ
 * @prop {number} follow.offset_bottom - 追尾要素の元々のオフセット・ボトム
 * @prop {number} follow.position_top - 追尾要素の元々のポジション・トップ
 */
function SimpleScrollFollow(elem, option) {
	this.setOption(option);
	this.setFollow(elem);
	this._ehScroll();
}

$.extend(SimpleScrollFollow.prototype, /** @lends SimpleScrollFollow.prototype */ {
	/**
	 * @desc スクロールを有効または無効にする
	 * @param {boolean} bool - true: 有効にする、 false: 無効にする
	 */
	setEnabled: function(bool) {
		this.option.enabled = bool;
		if (!this.option.enabled) $(this.follow.elem).css('top', this.follow.position_top);
	},

	/**
	 * @desc 追尾要素の設定をする
	 * @param {Object} elem - プラグインを適用するHTML要素
	 */
	setFollow: function(elem) {
		var follow = {};
		follow.elem = elem;
		follow.offset_top = $(follow.elem).offset().top;
		follow.offset_bottom = this._calcOffsetBottom(follow.elem);

		// topの元の位置を記憶する前に、topの値がautoの場合はゼロに設定する。
		if ($(follow.elem).css('top') == 'auto') $(follow.elem).css('top', 0);
		follow.position_top = Number($(follow.elem).css('top').replace(/px$/, ''));

		this.follow = follow;
	},

	/**
	 * @desc オプションを初期化する
	 * @param {Object} option - オプションを格納した連想配列
	 */
	setOption: function(option) {
		this.option =  $.extend({
			enabled: true,
			limit_elem: $('body'),
			min_width: 0,
		}, option);
	},

	/**
	 * @private
	 * @desc offset_bottomを算出する
	 * @param {Object} elem - 算出する対象のHTML要素
	 * @return {number} - 算出されたoffset_bottom
	 */
	_calcOffsetBottom: function(elem) {
		if (elem == 'window') {
			return $(window).scrollTop() + $(window).height();
		} else {
			return $(elem).offset().top +
				$(elem).height() +
				Number($(elem).css('border-top-width').replace(/px$/, '')) +
				Number($(elem).css('border-bottom-width').replace(/px$/, '')) +
				Number($(elem).css('padding-top').replace(/px$/, '')) +
				Number($(elem).css('padding-bottom').replace(/px$/, ''));
		}
	},

	/**
	 * @private
	 * @desc イベントハンドラ: 画面スクロール
	 */
	_ehScroll: function() {
		var self = this;
		$(window).scroll(function() {
			 // スクロールが無効の場合は即座に終了する
			if (!self.option.enabled) return false;

			// 最低幅を下回る場合は即座に終了する
			if (!window.matchMedia('(min-width: ' + self.option.min_width +'px)').matches) {
				$(self.follow.elem).css('top', self.follow.position_top);
				return false;
			}

			// 画面の上端、下端を取得
			var win = {
				scroll_top: $(this).scrollTop(),
				scroll_bottom: $(this).scrollTop() + $(this).height()
			};

			// 追尾要素の "現在の" 上端、下端を取得
			var current = {
				offset_top: $(self.follow.elem).offset().top,
				offset_bottom: self._calcOffsetBottom(self.follow.elem)
			};

			// 下限要素の下端を取得
			var limit = {offset_bottom: self._calcOffsetBottom(self.option.limit_elem)};

			// 下限 - 上限が要素高より低ければ即座に終了する
			if ((limit.offset_bottom - self.follow.offset_top) < (current.offset_bottom -current.offset_top)) return false;

			// ! positionのtopとoffsetのtopを混同しないように

			/* 分岐の構造
			if (画面上辺は上限より上か?) {
				要素上端は上限へ
			} else if (画面上辺は下限より下か?) {
				要素下端は下限へ
			} else if (画面高は要素高より高いか?) {
				if (下限 - 画面上辺は要素高より短いか?) {
					要素下端は下限へ
				} else {
					要素上端は画面上辺へ
				}
			} else {
				if (画面下辺は下限より下か?) {
					要素下端は下限へ
				} else if (画面下辺 - 上限 は、要素高より長いか?) {
					要素下端は画面下辺へ
				} else {
					要素上端は上限へ
				}
			}
			*/

			if (win.scroll_top  < self.follow.offset_top) { // 画面上辺は上限より上か?
				// 要素上端は上限へ
				$(self.follow.elem).css('top', self.follow.position_top);
			} else if (win.scroll_top > limit.offset_bottom) { // 画面上辺は下限より下か?
				// 要素下端は下限へ
				$(self.follow.elem).css('top', limit.offset_bottom - self.follow.offset_bottom + self.follow.position_top);
			} else if ((win.scroll_bottom - win.scroll_top) > (current.offset_bottom -current.offset_top)) { // 画面高は要素高より高いか?
				if ((limit.offset_bottom - win.scroll_top) < (current.offset_bottom -current.offset_top)) { // 下限 - 画面上辺 は、要素高より短いか?
					// 要素下端は下限へ
					$(self.follow.elem).css('top', limit.offset_bottom - self.follow.offset_bottom + self.follow.position_top);
				} else {
					// 要素上端は画面上辺へ
					$(self.follow.elem).css('top', win.scroll_top - self.follow.offset_top + self.follow.position_top);
				}
			} else {
				if (win.scroll_bottom > limit.offset_bottom) { // 画面下辺は下限より下か?
					// 要素下端は下限へ
					$(self.follow.elem).css('top', limit.offset_bottom - self.follow.offset_bottom + self.follow.position_top);
				} else if ((win.scroll_bottom - self.follow.offset_top) > (current.offset_bottom -current.offset_top)) { // 画面下辺 - 上限 は、要素高より長いか?
					// 要素下端は画面下辺へ
					$(self.follow.elem).css('top', win.scroll_bottom - self.follow.offset_bottom + self.follow.position_top);
				} else {
					// 要素上端は上限へ
					$(self.follow.elem).css('top', self.follow.position_top);
				}
			}
		});
	},
}); // endo of "$.extend"

})( /** namespace */ jQuery);