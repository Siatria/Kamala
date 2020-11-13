$(document).ready(function () {
  $('.form-btn').on('click touchend', function (e) {
    e.preventDefault()
    $(this).text('Submit').attr('type','submit')
    $('.hidden-wrap').slideDown(300)
    $('.full-form').css('height', 'auto')
  })
})