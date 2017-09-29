// Animated scrollTo function -------------------------------------------
window.requestAnimFrame = (function(){
		  return  window.requestAnimationFrame       ||
		          window.webkitRequestAnimationFrame ||
		          window.mozRequestAnimationFrame    ||
		          function( callback ){
		            window.setTimeout(callback, 1000 / 60);
		          };
		})();

function scrollToY(sign, speed, easing) {
  // scrollTargetY: the target scrollY property of the window
  // speed: time in pixels per second
  // easing: easing equation to use

  var scrollY = window.scrollY,
      scrollTargetY = sign*window.innerHeight+10 || sign*root.clientHeight || sign*body.clientHeight || 0,	//document.querySelector("li + a.section-anchor");
      speed = speed || 2000,
      easing = easing || 'easeOutSine',
      currentTime = 0;


	// console.log(sign*window.innerHeight);
	// console.log(speed);

  // min time .1, max time .8 seconds
  var time = Math.max(.1, Math.min(Math.abs(scrollY - scrollTargetY) / speed, .8));

  // easing equations from https://github.com/danro/easing-js/blob/master/easing.js
  var PI_D2 = Math.PI / 2,
      easingEquations = {
          easeOutSine: function (pos) {
              return Math.sin(pos * (Math.PI / 2));
          },
          easeInOutSine: function (pos) {
              return (-0.5 * (Math.cos(Math.PI * pos) - 1));
          },
          easeInOutQuint: function (pos) {
              if ((pos /= 0.5) < 1) {
                  return 0.5 * Math.pow(pos, 5);
              }
              return 0.5 * (Math.pow((pos - 2), 5) + 2);
          }
      };

  // add animation loop
  function tick() {
      currentTime += 1 / 60;

      var p = currentTime / time;
      var t = easingEquations[easing](p);

      if (p < 1) {
          requestAnimFrame(tick);
          window.scrollTo(0, scrollY + ((scrollTargetY - scrollY) * t));
      } else {
          console.log('scroll done');
          window.scrollTo(0, scrollTargetY);
      }
  }
  // call it once to get started
  tick();

	console.log(sign*window.innerHeight);

  function resetScroller(el) {
    var currentY = window.pageYOffset;
    var targetY = document.getElementById(el).offsetTop;
    var animator = setTimeout('resetScroller(\''+el+'\')', speed);

    if (currentY > targetY) {
      scrollY = currentY - distance;
      window.scroll(0, scrollY);
    } else {
      clearTimeout(animator);
    }
  }
}


// To display hidden email form
function displayEmailForm() {
  document.getElementById('popup_container').style.display = "block";
}

// To hide email form
function hideEmailForm() {
  document.getElementById('popup_container').style.display = "none";
}

// Validating submission
function verifySubmission() {
  if (document.getElementById('name').value == "" || document.getElementById('email').value == "" || document.getElementById('message').value == "")
  {
    alert("Please fill in all fields.");
  }
  else
  {
    document.getElementById('email_form').submit();
    alert("Email sent.");
  }
}
