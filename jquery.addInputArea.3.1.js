/*
jQuery Plugin
jquery.addInputArea.3.1
Yuusaku Miyazaki (toumin.m7@gmail.com)
MIT License
*/
(function($) {
	//***************************************
	//基幹
	//***************************************
	$.fn.addInputArea = function(options) {
		//return jQuery object to continue method chain.
		return this.each(function() {
			//オプションを使用準備
			options = initOptions(this, options);

			//削除ボタンを表示状態を決定する
			setDelBtnVisibility(this, options);

			//イベントハンドラ設定
			setEventHandler(this, options);

			//入力欄の番号を振り直す
			setNameAttribute(this, options);
		});
	};
	//***************************************
	//オプションを使用準備
	//***************************************
	//@called 基幹
	//@params obj elem (プラグインを適用するリスト)
	//@params obj options (ユーザから送られたオプション)
	//@return obj
	function initOptions(elem, options) {
		var id = $(elem).attr('id');
		options =  $.extend({
			attr_name : (id) ? id + '_%d'        : 'aia_%d',
			area_var  : (id) ? '.' + id + '_var' : '.aia_var',
			area_del  : false,
			btn_del   : (id) ? '.' + id + '_del' : '.aia_del',
			btn_add   : (id) ? '.' + id + '_add' : '.aia_add'
		}, options);
		if (!options.area_del) options.area_del = options.btn_del;
		return options;
	}
	//***************************************
	//削除ボタンを表示状態を決定する
	//***************************************
	function setDelBtnVisibility(elem, options) {
		if ($(elem).find(options.area_var).length == 1) {
			$(elem).find(options.area_del).hide();
		}
	}
	//***************************************
	//イベントハンドラ設定
	//***************************************
	//@called 基幹
	//@params obj elem (プラグインを適用するリスト)
	//@params obj options (ユーザから送られたオプション)
	function setEventHandler(elem, options) {
		//--------------------------------------------------------
		//『追加』ボタンを押した場合の処理
		//--------------------------------------------------------
		$(options.btn_add).click(function(ev) {
			//入力欄が2つ以上になるので、削除ボタンを表示する
			$(elem).find(options.area_del).show();

			//品目入力欄を追加
			var len_list = $(elem).find(options.area_var).length;
			var new_list = $(elem).find(options.area_var).eq(0).clone();

			$(new_list).find('[name]').each(function(idx, obj) {
				//name, id属性を変更
				setChangedName(obj, len_list);
				//val, textを空にする。
				$(obj).val('').text('');
			});
			$(new_list).find('[for]').each(function(idx, obj) {
				//for属性を変更
				setChangedName(obj, len_list);
			});

			$(elem).append(new_list);
		});
		//--------------------------------------------------------
		//『削除』ボタンを押した場合の処理
		//--------------------------------------------------------
		$(elem).find(options.btn_del).live('click', function(ev){
			ev.preventDefault();
			//品目入力欄を削除
			var idx = $(elem).find(options.btn_del).index(ev.target);
			$(elem).find(options.area_var).eq(idx).remove();

			var len_list = $(elem).find(options.area_var).length;

			//入力欄がひとつになるなら、削除ボタンは不要なので非表示にする
			if(len_list == 1) $(elem).find(options.area_del).hide();

			//入力欄の番号を振り直す
			setNameAttribute(elem, options);			
		});
	}
	//***************************************
	//入力欄の番号を振り直す
	//***************************************
	//@called 基幹, setEventHandler
	//@params obj elem (プラグインを適用するリスト)
	//@params obj options (ユーザから送られたオプション)
	function setNameAttribute(elem, options) {
		$(elem).find(options.area_var).each(function(idx, obj) {
			$(obj).find('[name]').each(function(idx_2, obj_2) {
				//name, id属性を変更
				setChangedName(obj_2, idx);
			});
			$(obj).find('[for]').each(function(idx_2, obj_2) {
				//for属性を変更
				setChangedName(obj_2, idx);
			});
		});
	}
	function setChangedName(obj, idx) {
		var type = ($(obj).attr('name')) ? 'name' : 'for';
		if (/(?:(?![0-9]+$).)+[0-9]+$/.test($(obj).attr(type))) {
			var changed =  $(obj).attr(type).replace(
				/((?:(?![0-9]+$).)+)[0-9]+$/,
				function() { return arguments[1] + idx }
			);
		} else if($(obj).attr('name_format')){
			var changed = $(obj).attr('name_format').replace('%d', idx);
		}
		$(obj).attr(type, changed);
		if (type == 'name') $(obj).attr('id', changed);
	}
})(jQuery);
