/*
jQuery Plugin
jquery.addInputArea.2.0
Yuusaku Miyazaki (toumin.m7@gmail.com)
MIT License
*/
(function($) {
	//***************************************
	//グローバル変数
	//***************************************
	var reg = /((?:(?![0-9]+$).)+)[0-9]+$/; //接頭辞抽出用の正規表現
	
	//***************************************
	//基幹
	//***************************************
	$.fn.addInputArea = function(options) {
		//return jQuery object to continue method chain.
		return this.each(function() {
			//オプションを使用準備
			options = initOptions(this, options);

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
		options = $.extend({
			cls_del : ($(elem).attr('id')) ? $(elem).attr('id')+'_del' : 'afp_del',
			btn_del : $('<button>').text('Delete'),
			btn_add : ($(elem).attr('id')) ? '#'+$(elem).attr('id')+'_add' : '#afp_add'
		}, options);
		
		//削除ボタンにCSSクラスを付加する。
		$(options.btn_del).addClass(options.cls_del);
		return options;
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
			//品目入力欄を追加
			var len_list = $(elem).children('li').length;
			var new_list = $(elem).children('li').eq(0).clone();

			$(new_list).find('[name]').each(function(idx, obj) {
				//name, id属性を変更
				var matches = $(obj).attr('name').match(reg);
				$(obj).attr({
					id   : matches[1] + len_list,
					name : matches[1] + len_list
				});
				//val, textを空にする。
				$(obj).val('').text('');
			});
			$(new_list).find('[for]').each(function(idx, obj) {
				//for属性を変更
				var matches = $(obj).attr('for').match(reg);
				$(obj).attr('for', matches[1] + len_list);
			});

			$(elem).append(new_list);
			//『削除』ボタンを一旦全消去し、配置し直す
			$(elem).find('.' + options.cls_del).remove();
			$(elem).children('li').each(function(idx, obj) {
				$(obj).append($(options.btn_del).clone());
			});
		});
		//--------------------------------------------------------
		//『削除』ボタンを押した場合の処理
		//--------------------------------------------------------
		$(elem).find('.' + options.cls_del).live('click', function(ev){
			//品目入力欄を削除
			var idx = $(elem).find('.' + options.cls_del).index(ev.target);
			$(elem).children('li').eq(idx).remove();

			var len_list = $(elem).children('li').length;

			//入力欄がひとつになるなら、削除ボタンは不要なので消去
			if(len_list == 1) $(elem).find('.' + options.cls_del).remove();

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
		$(elem).children('li').each(function(idx, obj) {
			$(obj).find('[name]').each(function(idx_2, obj_2) {
				//name, id属性を変更
				var matches = $(obj_2).attr('name').match(reg);
				$(obj_2).attr({
					id   : matches[1] + idx,
					name : matches[1] + idx
				});
			});
			$(obj).find('[for]').each(function(idx_2, obj_2) {
				//for属性を変更
				var matches = $(obj_2).attr('for').match(reg);
				$(obj_2).attr('for', matches[1] + idx);
			});
		});
	}
})(jQuery);
