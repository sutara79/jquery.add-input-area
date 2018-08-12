// 英語・日本語切り替え
$('.js-btn-lang').click(function(ev) {
  $('body [lang]').hide();
  $('.js-btn-lang').removeAttr('disabled');
  $('body [lang="' + $(ev.currentTarget).data('lang') + '"]').show();
  $(ev.currentTarget).attr('disabled', 'disabled');
});
$('#lang-en').trigger('click');

// 追尾スクロール (英語・日本語切り替えよりも後にすること)
$('#js-menu-follow').simpleScrollFollow({
  min_width: 960,
  limit_elem: 'article'
});

// 見出し横のリンクを生成
$('section.card').each(function() {
  var link = $('<a class="js-anchor">#</a>');
  $(link).attr('href', '#' + $(this).attr('id'));
  $(this).find('.card-header').prepend(link);
});