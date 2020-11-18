$(document).ready(function () {
  //Shows full form
  $('.continue-btn').on('click touchend', function (e) {
    e.preventDefault()
    $(this).fadeOut(300)
    $('.form-btn').fadeIn(300)
    $('.hidden-wrap').slideDown(300)
    $('.full-form').css('height', 'auto')
  })

  $('.register-form').submit(function (e) {
    e.preventDefault()
    $(this).slideUp(300)
    setTimeout(function () {
      $('.success-message').fadeIn(300)
    }, 300)
  })

  //Smooth scroller on anchors
  $('.header-register-btn, .register-btn, .logo').click(function () {
    let el = $(this).attr('href');
    $('html,body').animate({
      scrollTop: $(el).offset().top}, 1400);
    return false;
  });

  //Button rename
  if ( $(window).width() < 501 ) {
    $('.header-register-btn').text('Register')
  }

  //Slider
  $('.photo-slider').owlCarousel({
    items: 4,
    navigation: true,
    pagination: false,
    autoPlay: false,
    slideSpeed: 800,
    navText: ["<span class='icon-arrow-left'></span>", "<span class='icon-arrow-right'></span>"],
    loop: true,
    responsive: {
      320: { items: 2, nav: false },
      400: { items: 2 },
      650: { items: 3 },
      993: { items: 3, nav: true },
      1210: { items: 4 }
    }
  })

  //Parallax-viewport
  function isInViewport(node) {
    let rect = node.getBoundingClientRect()
    return (
      (rect.height > 0 || rect.width > 0) &&
      rect.bottom >= 0 &&
      rect.right >= 0 &&
      rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.left <= (window.innerWidth || document.documentElement.clientWidth)
    )
  }

  //Stats
  let as = 0
  function number_to(id,from,to,duration) {
    let element = document.getElementById(id)
    let start = new Date().getTime()
    setTimeout(function() {
      let now = (new Date().getTime()) - start
      let progress = now / duration
      let result = Math.floor((to - from) * progress + from)
      element.innerHTML = progress < 1 ? result : to
      if (progress < 1) setTimeout(arguments.callee, 10)
    }, 10)
  }

  function moveProgressBar() {
    let progressBar = $('.progress-wrap')
    let getPercent = (progressBar.data('progress-percent') / 100)
    let getProgressWrapWidth = progressBar.width()
    let progressTotal = getPercent * getProgressWrapWidth
    let animationLength = 2000

    $('.progress-bar').stop().animate({
      left: progressTotal
    }, animationLength)
  }

  moveProgressBar()
  if (as === 0) {
    number_to('investors',0,45,2000);
    number_to('days',0,30,2000);
    number_to('yield',0,9,2000);
    number_to('funded',0,125000,2000);
    as++
  }

  //Zoom off
  document.addEventListener('mousewheel', function(e){
    if(!e.ctrlKey && !e.metaKey) return
    e.preventDefault()
    e.stopImmediatePropagation()
  }, {passive:false})

  document.addEventListener('gesturestart', function(e){
    e.preventDefault()
    e.stopImmediatePropagation()
  }, {passive:false})

  document.addEventListener('keydown', function(e){
    if(!e.ctrlKey && !e.metaKey) return
    if(e.keyCode !== 189 && e.keyCode !== 187) return
    e.preventDefault()
    e.stopImmediatePropagation()
  }, {passive:false})

  $(window).on('scroll', function () {
    //Fixed header
    let scroller = $(this).scrollTop()
    let headerBtn = $('.header-register-btn')
    let fixedHeaderTop = $('.slider').offset().top
    let fixedHeaderBottom = $('.form-wrap').offset().top
    let scr = headerBtn['fade' + (
      (scroller > fixedHeaderTop - 100) &&
      (scroller < fixedHeaderBottom - 400) ?
        'In': 'Out')](300)

    //Parallax
    let scrolled = $(window).scrollTop()
    $('.parallax').each(function(index, element) {
      let initY = $(this).offset().top
      let height = $(this).height()
      let endY = initY + $(this).height()

      let visible = isInViewport(this)
      if(visible) {
        let diff = scrolled - initY
        let ratio = Math.round((diff / height) * 100)
        $(this).css('background-position','center ' + parseInt(-(ratio * 1.5)) + 'px')
      }
    })
  })
})
