/*
 *  jQuery function for smooth scroll and class mods
 */
$(document).ready(function() {

  var headerHeight = $('.navbar').outerHeight() - 45;

  $('.slide-section').click(function(e) {
    e.preventDefault();

    var target = $(this.hash);
    var targetTop = $(target).offset().top;
    var topScroll = $(window).scrollTop();
    var destination = targetTop + topScroll;

    $('html,body,div#page').animate({
      scrollTop: destination - headerHeight
    }, 1100, 'swing');

  });


  // hides/shows scroll-to-top button
  $window = $(window);
  $(window).scroll(function(){
    if($window.scrollTop() > 120)
        $("#up-arrow").addClass('active');
    else
        $("#up-arrow").removeClass('active');
  });

}); // end of document ready func. -------------------------------
