$(document).ready(function() {
  var BW = {
    init: function(){
      this.smoothScroll(this.els.link);
      console.log('welcome');
    },
    els: {
      link: $('a[href^="#"]')
    },
    smoothScroll: function(b){
      b.click(function(e){
        var scramble = baffle('.name');
        scramble.reveal(1000);
        var target = $(this.getAttribute('href'));
        if (target.length) {
            event.preventDefault();
            $('html, body').stop().animate({
                scrollTop: target.offset().top
            }, 1000);
        }
      })
    }
  }
  BW.init();
    // $('a[href^="#"]').on('click', function(event) {
    //     var target = $(this.getAttribute('href'));
    //     if (target.length) {
    //         event.preventDefault();
    //         $('html, body').stop().animate({
    //             scrollTop: target.offset().top
    //         }, 1000);
    //     }
    // });

    // TweenMax.to('.name', 2, {left:600});

    // $('.project-container').on('click', function() {
    //     var info = $(this).find('.project-info');
    //     if ($(this).hasClass('open')) {
    //         $(this).removeClass('open');
    //         info.slideUp();
    //         $('#work').css('height', '100vh');
    //         $('html, body').stop().animate({
    //             scrollTop: $('#work').offset().top
    //         }, 1000);
    //     } else {
    //         info.slideDown();
    //         var closeOpen = $('.open').find('.project-info');
    //         closeOpen.slideUp();
    //         closeOpen.parent().removeClass('open');
    //         $(this).addClass('open');
    //         $('#work').css('height', '100%');
    //     }
    // });

    $('.project').on('click', function() {
        var info = $(this).next();
        var projectContainer = $(this).parent()
        var $box = info.find('.tech');
        var $ic = info.find('.image-container');
        var $desc = info.find('.description');
        function complete(){
          info.slideUp();
          TweenMax.set([$box, $ic, $desc],{clearProps:"y"});
        }
        if ($(this).hasClass('open')) {
            $(this).removeClass('open');
            $(projectContainer).removeClass('open');
            TweenMax.to([$box, $ic, $desc], .4, {y:200,opacity:0, onComplete:complete })
            $('#work').css('height', '100vh');
            $('html, body').stop().animate({
                scrollTop: $('#work').offset().top
            }, 1000);

        } else {
            info.slideDown();
            var closeOpen = $('.open').find('.project-info');
            closeOpen.slideUp();
            TweenMax.to([$box, $ic, $desc], 0, {opacity:1});
            TweenMax.from($box, 1, {y:100, opacity:0});
            TweenMax.from([$ic, $desc], 1, {y:300, opacity:0});
            closeOpen.parent().removeClass('open');
            $(this).addClass('open');
            $(projectContainer).addClass('open');
            $('#work').css('height', '100%');
        }
    });

    // $('.smile').on('click', function() {
    //     function getRandomColor() {
    //         var letters = '0123456789ABCDEF';
    //         var color = '#';
    //         for (var i = 0; i < 6; i++) {
    //             color += letters[Math.floor(Math.random() * 16)];
    //         }
    //         return color;
    //     }
    //     $(this).css('fill', getRandomColor());
    // });

    Draggable.create(".smile", {type:"x,y", edgeResistance:0.65, bounds:"body", throwProps:true});

    // var workLink = $('#work-link');
    // var infoLink = $('#info-link');
    // $('#work').waypoint(function(direction) {
    //     if (direction === 'down') {
    //         workLink.css({
    //             'border-bottom': '2px solid white'
    //         });
    //         infoLink.css({
    //             'border-bottom': '2px solid black'
    //         });
    //     }
    // }, {
    //     offset: '20%'
    // });
    //
    // $('#work').waypoint(function(direction) {
    //     if (direction === 'up') {
    //         workLink.css({
    //             'border-bottom': '2px solid white'
    //         });
    //         infoLink.css({
    //             'border-bottom': '2px solid black'
    //         });
    //     }
    // }, {
    //     offset: '-75%'
    // });
    //
    // $('#info').waypoint(function(direction) {
    //     if (direction === 'down') {
    //         infoLink.css({
    //             'border-bottom': '2px solid white'
    //         });
    //         workLink.css({
    //             'border-bottom': '2px solid black'
    //         });
    //     }
    // }, {
    //     offset: '0%'
    // });
    //
    // $('.main').waypoint(function(direction) {
    //     if (direction === 'up') {
    //         infoLink.css({
    //             'border-bottom': 'none'
    //         });
    //         workLink.css({
    //             'border-bottom': 'none'
    //         });
    //     }
    // }, {
    //     offset: '-50%'
    // });

    var b = baffle('.name');
    b.reveal(1000);

});
