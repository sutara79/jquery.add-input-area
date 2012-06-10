jQuery(document).ready(function($){
	$('#language button').click(function(ev) {
		$('*[class*=lang_]').hide();
		$('button[id*=lang_]').removeAttr('disabled');
		$('.' + $(ev.target).attr('id')).show();
		$(ev.target).attr('disabled', 'disabled');
	});
	$('.lang_ja').hide();
	$('#lang_en').attr('disabled', 'disabled');
});
