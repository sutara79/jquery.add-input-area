/**
 * jQuery Plugin
 * jquery.addInputArea.4.6
 * Yuusaku Miyazaki (toumin.m7@gmail.com)
 * MIT License
 */
(function($) {

$.fn.addInputArea = function(option) {
	return this.each(function() {
		(new addInputArea).init(this, option);
	});
};

var addInputArea = function() {};

$.extend(addInputArea.prototype, {
	// ***************************************
	// 初期化
	init: function(elem, option) {
		this.elem = elem;
		return this
			.setOption(option)
			.setDelBtnVisibility()
			.setEventHandler()
			.setNameAttribute()
			.saveOriginal();
	},
	//***************************************
	// オプションを使用準備
	setOption: function(option) {
		var id = $(this.elem).attr('id');
		this.option =  $.extend({
			attr_name : (id) ? id  + '_%d'       : 'aia_%d',
			area_var  : (id) ? '.' + id + '_var' : '.aia_var',
			area_del  : false,
			btn_del   : (id) ? '.' + id + '_del' : '.aia_del',
			btn_add   : (id) ? '.' + id + '_add' : '.aia_add',
			after_add : false,
			maximum   : false
		}, option);
		if (!this.option.area_del) this.option.area_del = this.option.btn_del;
		return this;
	},
	// ***************************************
	//削除ボタンを表示状態を決定する
	setDelBtnVisibility: function() {
		if ($(this.elem).find(this.option.area_var).length == 1) {
			$(this.elem).find(this.option.area_del).hide();
		}
		return this;
	},
	// ***************************************
	// イベントハンドラ設定
	setEventHandler: function() {
		// --------------------------------
		//『追加』ボタンを押した場合の処理
		// --------------------------------
		var self = this;
		$(this.option.btn_add).click(function(ev) {
			// 品目入力欄を追加
			var len_list = $(self.elem).find(self.option.area_var).length;
			var new_list = $(self.option.original).clone(true);

			$(new_list).find('[name]').each(function(idx, obj) {
				// name, id属性を変更
				self._changeAttrAlongFormat(obj, len_list, 'name');
				self._changeAttrAlongFormat(obj, len_list, 'id');

				// val, textを空にする。
				if ($(obj).attr('empty_val') != 'false') {
					if (
						$(obj).attr('type') == 'checkbox' ||
						$(obj).attr('type') == 'radio'
					) {
						obj.checked = false;
					} else if (
						$(obj).attr('type') != 'submit' &&
						$(obj).attr('type') != 'reset'  &&
						$(obj).attr('type') != 'image'  &&
						$(obj).attr('type') != 'button'
					) {
						$(obj).val('');
					}
				}
			});
			$(new_list).find('[for]').each(function(idx, obj) {
				// for属性を変更
				self._changeAttrAlongFormat(obj, len_list, 'for');
			});

			$(self.elem).append(new_list);
			// 入力欄が2つ以上になるので、削除ボタンを表示する
			$(self.elem).find(self.option.area_del).show();

			// 追加上限
			if (
				self.option.maximum !== false &&
				$(self.elem).find(self.option.area_var).length >= self.option.maximum
			) {
				$(self.option.btn_add).hide();
			}
			// 追加後の処理があれば実行する
			if (typeof self.option.after_add == 'function') self.option.after_add();
		});
		// --------------------------------
		//『削除』ボタンを押した場合の処理
		// --------------------------------
		$(self.elem).on('click', self.option.btn_del, function(ev) {
			ev.preventDefault();
			//品目入力欄を削除
			var idx = $(self.elem).find(self.option.btn_del).index(ev.target);
			$(self.elem).find(self.option.area_var).eq(idx).remove();

			var len_list = $(self.elem).find(self.option.area_var).length;

			// 入力欄がひとつになるなら、削除ボタンは不要なので非表示にする
			if(len_list == 1) $(self.elem).find(self.option.area_del).hide();

			// 入力欄の番号を振り直す
			self.setNameAttribute();

			// 追加上限
			if (
				self.option.maximum !== false &&
				$(self.elem).find(self.option.area_var).length < self.option.maximum
			) {
				$(self.option.btn_add).show();
			}		
		});
		return this;
	},
	// ***************************************
	// 入力欄の番号を振り直す
	setNameAttribute: function() {
		var self = this;
		$(this.elem).find(this.option.area_var).each(function(idx, obj) {
			$(obj).find('[name]').each(function(idx_2, obj_2) {
				// name, id属性を変更
				self._changeAttrAlongFormat(obj_2, idx, 'name');
				self._changeAttrAlongFormat(obj_2, idx, 'id');
			}).end()
			.find('[for]').each(function(idx_2, obj_2) {
				// for属性を変更
				self._changeAttrAlongFormat(obj_2, idx, 'for');
			});
		});
		return this;
	},
	// ***************************************
	// クローン元を保管する
	saveOriginal: function() {
		this.option.original = $(this.elem).find(this.option.area_var).eq(0).clone(true);
		return this;
	},
	// ***************************************
	// 入力欄の番号を振り直す
	// @called setEventHandler, setNameAttribute
	// @params object obj  (プラグインを適用するリスト)
	// @params number idx  通し番号を変更する値
	// @params string type 属性の名前 
	_changeAttrAlongFormat: function(obj, idx, type) {
		var changed = null;
		if (/(?:(?![0-9]+$).)+[0-9]+$/.test($(obj).attr(type))) {
			changed =  $(obj).attr(type).replace(
				/((?:(?![0-9]+$).)+)[0-9]+$/,
				function() { return arguments[1] + idx; }
			);
		} else {
			changed = (type == 'name' && $(obj).attr('name_format')) ?
				$(obj).attr('name_format').replace('%d', idx) :
				($(obj).attr('id_format')) ?
					$(obj).attr('id_format').replace('%d', idx) : false;
		}
		$(obj).attr(type, changed);
	}
});

})(jQuery);
