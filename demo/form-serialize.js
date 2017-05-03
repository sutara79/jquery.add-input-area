$(function() {
  $('.form-serialize').submit(function(ev) {
    ev.preventDefault();
    var arr = $(this).serializeArray();
    console.log(arr);
    var result = '';
    $.each(arr, function(i, f) {
      result += f.name + ': ' + f.value + '\n';
    });
    alert(result);
  });
});