$(document).ready(function () {
  $('.form-btn').on('click touchend', function (e) {
    e.preventDefault()
    $(this).text('Submit').attr('type','submit')
    $('.hidden-wrap').slideDown(300)
    $('.full-form').css('height', 'auto')
  })
})

$(function(){
  if ( $(window).width() > 992 ) {
    let as = 0
    $(window).on('scroll', function () {
      function number_to(id,from,to,duration) {
        let element = document.getElementById(id);
        let start = new Date().getTime();
        setTimeout(function() {
          let now = (new Date().getTime()) - start;
          let progress = now / duration;
          let result = Math.floor((to - from) * progress + from);
          element.innerHTML = progress < 1 ? result : to;
          if (progress < 1) setTimeout(arguments.callee, 10);
        }, 10);}

      function moveProgressBar() {
        let getPercent = ($('.progress-wrap').data('progress-percent') / 100);
        let getProgressWrapWidth = $('.progress-wrap').width();
        let progressTotal = getPercent * getProgressWrapWidth;
        let animationLength = 2000;

        $('.progress-bar').stop().animate({
          left: progressTotal
        }, animationLength);
      }

      let progress = $('.stats-wrap').offset().top

      if ($(this).scrollTop() > progress - 500) {
        moveProgressBar()
        if(as === 0) {
          number_to("investors",0,45,2000);
          number_to("days",0,30,2000);
          number_to("yield",0,9,2000);
          number_to("funded",0,125000,2000);
          as++
        }
      }
    });
  }
})
